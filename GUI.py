import tkinter as tk
from tkinter import messagebox
from pymongo import MongoClient

print("Starting GUI.py...")

# ---------------------------
# Database Connection
# ---------------------------
def connect_to_mongo():
    try:
        client = MongoClient("mongodb://localhost:27017/")
        db = client["barbecueDB"]
        return db
    except Exception as e:
        messagebox.showerror("Error", f"Cannot connect to MongoDB: {e}")
        return None

# ---------------------------
# Helper Functions for Lookups
# ---------------------------
def get_meat_names(meat_ids):
    """
    Given a list of meat IDs, return a list of meat type names by querying the 'meats' collection.
    """
    db = connect_to_mongo()
    names = []
    for mid in meat_ids:
        meat_doc = db["meats"].find_one({"_id": mid})
        if meat_doc:
            # Use the "type" field as the display name
            names.append(meat_doc.get("type", mid))
        else:
            names.append(mid)
    return names

def get_addition_names(addition_ids):
    """
    Given a list of addition IDs, return a list of addition names by querying the 'additions' collection.
    """
    db = connect_to_mongo()
    names = []
    for aid in addition_ids:
        addition_doc = db["additions"].find_one({"_id": aid})
        if addition_doc:
            names.append(addition_doc.get("name", aid))
        else:
            names.append(aid)
    return names

# ---------------------------
# User Management
# ---------------------------
def add_user_window(users_listbox):
    db = connect_to_mongo()
    if db is None:
        return

    # Function to refresh the users listbox (shows user names)
    def refresh_users_list():
        users_listbox.delete(0, tk.END)
        for user in db["users"].find({}, {"_id": 1, "name": 1}):
            users_listbox.insert(tk.END, user["name"])

    # Prepare lists and mappings for preferences and favorite recipes.
    # For preferences, we pull the "type" field from the meats collection.
    meats_list = []
    for meat in db["meats"].find({}, {"type": 1, "_id": 0}):
        meats_list.append(meat["type"])

    # For favorite recipes, we pull recipe documents (to store _id values).
    favorite_recipes_mapping = {}
    favorite_recipes_list = []
    recipes_cursor = list(db["recipes"].find({}, {"_id": 1, "name": 1}))
    for i, recipe in enumerate(recipes_cursor):
        favorite_recipes_list.append(recipe["name"])
        favorite_recipes_mapping[i] = recipe["_id"]

    def save_user_to_mongo():
        user_name = user_name_entry.get().strip()
        if not user_name:
            messagebox.showerror("Error", "User name must be filled!")
            return

        # Get selected preferences (meats). The displayed text is the meat type.
        selected_pref_indices = preferences_listbox.curselection()
        selected_preferences = [preferences_listbox.get(i) for i in selected_pref_indices]

        # Get selected favorite recipes by mapping the index to the recipe _id.
        selected_recipe_indices = favorite_recipes_listbox.curselection()
        selected_fav_recipes = [favorite_recipes_mapping[i] for i in selected_recipe_indices]

        # Event history is managed in Mongo and starts as an empty list.
        event_history = []

        # Generate a custom _id in the format "user_X"
        max_user_number = 0
        for user in db["users"].find():
            if isinstance(user["_id"], str) and user["_id"].startswith("user_"):
                try:
                    num = int(user["_id"].split("_")[1])
                    if num > max_user_number:
                        max_user_number = num
                except Exception:
                    continue
        new_id = f"user_{max_user_number + 1}"

        user_data = {
            "_id": new_id,
            "name": user_name,
            "preferences": selected_preferences,
            "favorite_recipes": selected_fav_recipes,
            "event_history": event_history
        }

        try:
            db["users"].insert_one(user_data)
            messagebox.showinfo("Success", f"User '{user_name}' added with _id: {new_id}!")
            user_name_entry.delete(0, tk.END)
            # Clear selections in the listboxes
            preferences_listbox.selection_clear(0, tk.END)
            favorite_recipes_listbox.selection_clear(0, tk.END)
            refresh_users_list()  # Refresh the users listbox to include the new user
        except Exception as e:
            messagebox.showerror("Error", f"Failed to add user: {e}")

    # Create the Add User window
    add_user_win = tk.Toplevel()
    add_user_win.title("Add User")

    tk.Label(add_user_win, text="User Name:").grid(row=0, column=0, sticky=tk.W)
    user_name_entry = tk.Entry(add_user_win, width=30)
    user_name_entry.grid(row=0, column=1, pady=5)

    # Create a Listbox for Preferences (meats)
    tk.Label(add_user_win, text="Preferences (select meats):").grid(row=1, column=0, sticky=tk.W)
    preferences_listbox = tk.Listbox(add_user_win, selectmode=tk.MULTIPLE, width=30, height=5, exportselection=False)
    preferences_listbox.grid(row=1, column=1, pady=5)
    for pref in meats_list:
        preferences_listbox.insert(tk.END, pref)

    # Create a Listbox for Favorite Recipes
    tk.Label(add_user_win, text="Favorite Recipes (select recipes):").grid(row=2, column=0, sticky=tk.W)
    favorite_recipes_listbox = tk.Listbox(add_user_win, selectmode=tk.MULTIPLE, width=30, height=5, exportselection=False)
    favorite_recipes_listbox.grid(row=2, column=1, pady=5)
    for recipe in favorite_recipes_list:
        favorite_recipes_listbox.insert(tk.END, recipe)

    # Note: We do not display the event history field in the GUI.
    # It will be initialized as an empty list in the database.

    tk.Button(add_user_win, text="Save User", command=save_user_to_mongo)\
        .grid(row=3, column=1, sticky=tk.E, pady=10, padx=5)
    tk.Button(add_user_win, text="Exit", command=add_user_win.destroy)\
        .grid(row=3, column=0, sticky=tk.W, pady=10, padx=5)


# ---------------------------
# Create New Event Window (Updated)
# ---------------------------
def create_event_window():
    db = connect_to_mongo()
    if db is None:
        return

    # Get the highest existing _id in the events collection
    events = db["events"].find()
    max_id = 0
    for event in events:
        try:
            current_id = int(event["_id"].split("_")[1])
            max_id = max(max_id, current_id)
        except (ValueError, KeyError, IndexError):
            continue
    new_id = f"event_{max_id + 1}"

    # Create mapping dictionaries for meats and side dishes.
    meats_mapping = {}
    additions_mapping = {}

    create_event_win = tk.Toplevel()
    create_event_win.title("Create Event")

    tk.Label(create_event_win, text=f"New Event ID: {new_id}").grid(row=0, column=0, columnspan=2, pady=5)

    tk.Label(create_event_win, text="Event Name:").grid(row=1, column=0, sticky=tk.W)
    event_name_entry = tk.Entry(create_event_win, width=30)
    event_name_entry.grid(row=1, column=1, pady=5)

    tk.Label(create_event_win, text="Event Date:").grid(row=2, column=0, sticky=tk.W)
    event_date_entry = tk.Entry(create_event_win, width=30)
    event_date_entry.grid(row=2, column=1, pady=5)

    tk.Label(create_event_win, text="Event Location:").grid(row=3, column=0, sticky=tk.W)
    event_location_entry = tk.Entry(create_event_win, width=30)
    event_location_entry.grid(row=3, column=1, pady=5)

    # ---------------------------
    # Meats Listbox: Query the 'meats' collection
    # ---------------------------
    tk.Label(create_event_win, text="Select Meats:").grid(row=4, column=0, sticky=tk.W)
    meats_listbox = tk.Listbox(create_event_win, selectmode=tk.MULTIPLE, width=30, height=5, exportselection=False)
    meats_listbox.grid(row=4, column=1, pady=5)
    for i, meat in enumerate(db["meats"].find({}, {"_id": 1, "type": 1})):
        meats_listbox.insert(tk.END, meat["type"])
        meats_mapping[i] = meat["_id"]

    # ---------------------------
    # Side Dishes Listbox: (unchanged)
    # ---------------------------
    tk.Label(create_event_win, text="Select Side Dishes:").grid(row=5, column=0, sticky=tk.W)
    side_dishes_listbox = tk.Listbox(create_event_win, selectmode=tk.MULTIPLE, width=30, height=5, exportselection=False)
    side_dishes_listbox.grid(row=5, column=1, pady=5)
    for i, addition in enumerate(db["additions"].find({}, {"_id": 1, "name": 1})):
        side_dishes_listbox.insert(tk.END, addition["name"])
        additions_mapping[i] = addition["_id"]

    # ---------------------------
    # Participants Listbox: (unchanged)
    # ---------------------------
    tk.Label(create_event_win, text="Select Participants:").grid(row=6, column=0, sticky=tk.W)
    users_listbox = tk.Listbox(create_event_win, selectmode=tk.MULTIPLE, width=30, height=5, exportselection=False)
    users_listbox.grid(row=6, column=1, pady=5)
    users_cursor = list(db["users"].find({}, {"_id": 1, "name": 1}))
    for user in users_cursor:
        users_listbox.insert(tk.END, user["name"])

    def save_event_to_mongo():
        event_name = event_name_entry.get().strip()
        event_date = event_date_entry.get().strip()
        event_location = event_location_entry.get().strip()

        if not event_name or not event_date or not event_location:
            messagebox.showerror("Error", "All fields must be filled!")
            return

        # Get the selected meat IDs
        selected_meat_indices = meats_listbox.curselection()
        selected_meats = [meats_mapping[i] for i in selected_meat_indices]

        # Get the selected side dishes
        selected_addition_indices = side_dishes_listbox.curselection()
        selected_side_dishes = [additions_mapping[i] for i in selected_addition_indices]

        # Rebuild the users mapping from the current users_listbox contents.
        updated_users_mapping = {}
        users_cursor = list(db["users"].find({}, {"_id": 1, "name": 1}))
        for i, user in enumerate(users_cursor):
            updated_users_mapping[i] = (user["_id"], user["name"])

        selected_user_indices = users_listbox.curselection()
        try:
            selected_users = [updated_users_mapping[i] for i in selected_user_indices]
        except KeyError as e:
            messagebox.showerror("Error", f"User mapping error: {e}")
            return

        participants_data = [{"user_id": uid, "name": uname} for (uid, uname) in selected_users]

        event_data = {
            "_id": new_id,
            "name": event_name,
            "date": event_date,
            "location": event_location,
            "menu": {
                "meats": selected_meats,
                "side_dishes": selected_side_dishes
            },
            "participants": participants_data
        }

        try:
            db["events"].insert_one(event_data)
            messagebox.showinfo("Success", "Event saved to MongoDB!")
            create_event_win.destroy()
        except Exception as e:
            messagebox.showerror("Error", f"Failed to save event: {e}")

    tk.Button(create_event_win, text="Add User", command=lambda: add_user_window(users_listbox))\
        .grid(row=7, column=0, sticky=tk.W, pady=10, padx=5)
    tk.Button(create_event_win, text="Save to Mongo", command=save_event_to_mongo)\
        .grid(row=7, column=1, sticky=tk.E, pady=10, padx=5)
    tk.Button(create_event_win, text="Exit", command=create_event_win.destroy)\
        .grid(row=8, column=0, sticky=tk.W, pady=10, padx=5)

# ---------------------------
# Global Mapping for Events
# ---------------------------
event_mapping = {}

# ---------------------------
# Refresh, Delete, and Edit Functions
# ---------------------------
def refresh_events_list(events_listbox, details_text):
    db = connect_to_mongo()
    if db is None:
        return
    events_listbox.delete(0, tk.END)
    global event_mapping
    event_mapping = {}
    events = list(db["events"].find())
    for i, event in enumerate(events):
        display_text = f"{event['_id']} - {event.get('name', '')}"
        events_listbox.insert(tk.END, display_text)
        event_mapping[i] = event["_id"]
    # Clear the details box
    details_text.config(state=tk.NORMAL)
    details_text.delete("1.0", tk.END)
    details_text.insert(tk.END, "Select an event to view details.")
    details_text.config(state=tk.DISABLED)

def delete_selected_event(events_listbox, details_text):
    selected = events_listbox.curselection()
    if not selected:
        messagebox.showerror("Error", "Please select an event to delete!")
        return
    index = selected[0]
    event_id = event_mapping.get(index)
    if not event_id:
        messagebox.showerror("Error", "Selected event not found!")
        return
    confirm = messagebox.askyesno("Confirm", "Are you sure you want to delete this event?")
    if not confirm:
        return
    db = connect_to_mongo()
    if db is None:
        return
    try:
        db["events"].delete_one({"_id": event_id})
        messagebox.showinfo("Success", "Event deleted successfully!")
        refresh_events_list(events_listbox, details_text)
    except Exception as e:
        messagebox.showerror("Error", f"Failed to delete event: {e}")

def edit_selected_event(events_listbox, details_text):
    selected = events_listbox.curselection()
    if not selected:
        messagebox.showerror("Error", "Please select an event to edit!")
        return
    index = selected[0]
    event_id = event_mapping.get(index)
    if not event_id:
        messagebox.showerror("Error", "Selected event not found!")
        return
    edit_event_window(event_id, events_listbox, details_text)

# ---------------------------
# Edit Event Window (Updated)
# ---------------------------
def edit_event_window(event_id, events_listbox, details_text):
    db = connect_to_mongo()
    if db is None:
        return
    event = db["events"].find_one({"_id": event_id})
    if not event:
        messagebox.showerror("Error", "Event not found!")
        return

    edit_win = tk.Toplevel()
    edit_win.title("Edit Event")

    tk.Label(edit_win, text=f"Editing Event ID: {event_id}").grid(row=0, column=0, columnspan=2, pady=5)

    # Event Name
    tk.Label(edit_win, text="Event Name:").grid(row=1, column=0, sticky=tk.W)
    event_name_entry = tk.Entry(edit_win, width=30)
    event_name_entry.grid(row=1, column=1, pady=5)
    event_name_entry.insert(0, event.get("name", ""))

    # Event Date
    tk.Label(edit_win, text="Event Date:").grid(row=2, column=0, sticky=tk.W)
    event_date_entry = tk.Entry(edit_win, width=30)
    event_date_entry.grid(row=2, column=1, pady=5)
    event_date_entry.insert(0, event.get("date", ""))

    # Event Location
    tk.Label(edit_win, text="Event Location:").grid(row=3, column=0, sticky=tk.W)
    event_location_entry = tk.Entry(edit_win, width=30)
    event_location_entry.grid(row=3, column=1, pady=5)
    event_location_entry.insert(0, event.get("location", ""))

    # Create mapping dictionaries for meats, side dishes, and users.
    meats_mapping = {}
    additions_mapping = {}
    users_mapping = {}

    # ---------------------------
    # Meats Listbox: Query the 'meats' collection
    # ---------------------------
    tk.Label(edit_win, text="Select Meats:").grid(row=4, column=0, sticky=tk.W)
    meats_listbox = tk.Listbox(edit_win, selectmode=tk.MULTIPLE, width=30, height=5, exportselection=False)
    meats_listbox.grid(row=4, column=1, pady=5)
    meats = list(db["meats"].find({}, {"_id": 1, "type": 1}))
    current_meat_ids = event.get("menu", {}).get("meats", [])
    for i, meat in enumerate(meats):
        meats_listbox.insert(tk.END, meat["type"])
        meats_mapping[i] = meat["_id"]
        if meat["_id"] in current_meat_ids:
            meats_listbox.selection_set(i)

    # ---------------------------
    # Side Dishes Listbox: (unchanged)
    # ---------------------------
    tk.Label(edit_win, text="Select Side Dishes:").grid(row=5, column=0, sticky=tk.W)
    side_dishes_listbox = tk.Listbox(edit_win, selectmode=tk.MULTIPLE, width=30, height=5, exportselection=False)
    side_dishes_listbox.grid(row=5, column=1, pady=5)
    additions = list(db["additions"].find({}, {"_id": 1, "name": 1}))
    current_addition_ids = event.get("menu", {}).get("side_dishes", [])
    for i, addition in enumerate(additions):
        side_dishes_listbox.insert(tk.END, addition["name"])
        additions_mapping[i] = addition["_id"]
        if addition["_id"] in current_addition_ids:
            side_dishes_listbox.selection_set(i)

    # ---------------------------
    # Participants Listbox: (unchanged)
    # ---------------------------
    tk.Label(edit_win, text="Select Participants:").grid(row=6, column=0, sticky=tk.W)
    users_listbox = tk.Listbox(edit_win, selectmode=tk.MULTIPLE, width=30, height=5, exportselection=False)
    users_listbox.grid(row=6, column=1, pady=5)
    users = list(db["users"].find({}, {"_id": 1, "name": 1}))
    current_user_ids = [participant.get("user_id") for participant in event.get("participants", [])]
    for i, user in enumerate(users):
        users_listbox.insert(tk.END, user["name"])
        users_mapping[i] = (user["_id"], user["name"])
        if user["_id"] in current_user_ids:
            users_listbox.selection_set(i)

    tk.Button(edit_win, text="Add User", command=lambda: add_user_window(users_listbox))\
        .grid(row=7, column=0, sticky=tk.W, pady=10, padx=5)

    def save_edited_event():
        new_name = event_name_entry.get()
        new_date = event_date_entry.get()
        new_location = event_location_entry.get()
        selected_meat_indices = meats_listbox.curselection()
        selected_meats = [meats_mapping[i] for i in selected_meat_indices]
        selected_addition_indices = side_dishes_listbox.curselection()
        selected_side_dishes = [additions_mapping[i] for i in selected_addition_indices]
        selected_user_indices = users_listbox.curselection()
        selected_users = [users_mapping[i] for i in selected_user_indices]
        participants_data = [{"user_id": uid, "name": uname} for (uid, uname) in selected_users]

        if not new_name or not new_date or not new_location:
            messagebox.showerror("Error", "All fields must be filled!")
            return

        update_data = {
            "name": new_name,
            "date": new_date,
            "location": new_location,
            "menu": {
                "meats": selected_meats,
                "side_dishes": selected_side_dishes
            },
            "participants": participants_data
        }
        try:
            db["events"].update_one({"_id": event_id}, {"$set": update_data})
            messagebox.showinfo("Success", "Event updated successfully!")
            edit_win.destroy()
            refresh_events_list(events_listbox, details_text)
        except Exception as e:
            messagebox.showerror("Error", f"Failed to update event: {e}")

    tk.Button(edit_win, text="Save Changes", command=save_edited_event)\
        .grid(row=8, column=1, sticky=tk.E, pady=10, padx=5)
    tk.Button(edit_win, text="Exit", command=edit_win.destroy)\
        .grid(row=8, column=0, sticky=tk.W, pady=10, padx=5)


# ---------------------------
# Main Window: Event List and Details
# ---------------------------
def main_window():
    root = tk.Tk()
    root.title("Event Management")

    # Main frame holds two subframes: left for list & buttons, right for event details
    main_frame = tk.Frame(root)
    main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

    # Left frame for the events list and buttons
    left_frame = tk.Frame(main_frame)
    left_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

    tk.Label(left_frame, text="All Events:").pack(pady=5)
    events_listbox = tk.Listbox(left_frame, width=50, height=15)
    events_listbox.pack(pady=5)

    # Button frame for list operations
    button_frame = tk.Frame(left_frame)
    button_frame.pack(pady=10)

    tk.Button(button_frame, text="Refresh Events", command=lambda: refresh_events_list(events_listbox, details_text)).grid(row=0, column=0, padx=5)
    tk.Button(button_frame, text="Create Event", command=create_event_window).grid(row=0, column=1, padx=5)
    tk.Button(button_frame, text="Edit Event", command=lambda: edit_selected_event(events_listbox, details_text)).grid(row=0, column=2, padx=5)
    tk.Button(button_frame, text="Delete Event", command=lambda: delete_selected_event(events_listbox, details_text)).grid(row=0, column=3, padx=5)
    tk.Button(button_frame, text="Exit", command=root.destroy).grid(row=0, column=4, padx=5)

    # Right frame for event details
    right_frame = tk.Frame(main_frame)
    right_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True, padx=(10, 0))

    tk.Label(right_frame, text="Event Details:").pack(pady=5)
    details_text = tk.Text(right_frame, wrap=tk.WORD, width=40, height=20)
    details_text.pack(fill=tk.BOTH, expand=True)
    details_text.config(state=tk.DISABLED)

    # Function to update the details box when an event is selected.
    def update_event_details(event):
        selection = events_listbox.curselection()
        if not selection:
            details_text.config(state=tk.NORMAL)
            details_text.delete("1.0", tk.END)
            details_text.insert(tk.END, "No event selected.")
            details_text.config(state=tk.DISABLED)
            return
        index = selection[0]
        event_id = event_mapping.get(index)
        if not event_id:
            details_text.config(state=tk.NORMAL)
            details_text.delete("1.0", tk.END)
            details_text.insert(tk.END, "Event not found!")
            details_text.config(state=tk.DISABLED)
            return

        db = connect_to_mongo()
        if db is None:
            details_text.config(state=tk.NORMAL)
            details_text.delete("1.0", tk.END)
            details_text.insert(tk.END, "Error connecting to database!")
            details_text.config(state=tk.DISABLED)
            return

        event_data = db["events"].find_one({"_id": event_id})
        if not event_data:
            details_text.config(state=tk.NORMAL)
            details_text.delete("1.0", tk.END)
            details_text.insert(tk.END, "Event not found in database!")
            details_text.config(state=tk.DISABLED)
            return

        # Format the event details.
        details_str = f"Event ID: {event_data.get('_id', '')}\n"
        details_str += f"Name: {event_data.get('name', '')}\n"
        details_str += f"Date: {event_data.get('date', '')}\n"
        details_str += f"Location: {event_data.get('location', '')}\n\n"
        details_str += "Menu:\n"
        menu = event_data.get("menu", {})

        # Process meats: if stored as IDs (starting with "meat_"), look up names.
        meats = menu.get("meats", [])
        if meats and all(m.startswith("meat_") for m in meats):
            meats = get_meat_names(meats)
        details_str += "  Meats: " + ", ".join(meats) + "\n"

        # Process side dishes similarly.
        side_dishes = menu.get("side_dishes", [])
        if side_dishes and all(s.startswith("addition_") for s in side_dishes):
            side_dishes = get_addition_names(side_dishes)
        details_str += "  Side Dishes: " + ", ".join(side_dishes) + "\n\n"

        participants = event_data.get("participants", [])
        details_str += "Participants: " + ", ".join([p.get("name", "") for p in participants]) + "\n"

        details_text.config(state=tk.NORMAL)
        details_text.delete("1.0", tk.END)
        details_text.insert(tk.END, details_str)
        details_text.config(state=tk.DISABLED)

    # Bind selection changes to update the details box.
    events_listbox.bind('<<ListboxSelect>>', update_event_details)

    # Initially load events into the list and clear the details box.
    refresh_events_list(events_listbox, details_text)

    root.mainloop()

if __name__ == "__main__":
    main_window()
