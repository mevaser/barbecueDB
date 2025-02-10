import tkinter as tk
from tkinter import messagebox
from pymongo import MongoClient
from bson.objectid import ObjectId

print("Starting GUI.py...")

# Connect to MongoDB
def connect_to_mongo():
    try:
        client = MongoClient("mongodb://localhost:27017/")
        db = client["barbecueDB"]
        return db
    except Exception as e:
        messagebox.showerror("Error", f"Cannot connect to MongoDB: {e}")
        return None

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

    # Create the event creation window
    def save_event_to_mongo():
        event_name = event_name_entry.get()
        event_date = event_date_entry.get()
        event_location = event_location_entry.get()
        selected_recipes = [recipes_listbox.get(i) for i in recipes_listbox.curselection()]
        selected_side_dishes = [side_dishes_listbox.get(i) for i in side_dishes_listbox.curselection()]
        participants = participants_text.get("1.0", tk.END).strip().split("\n")
        participants_data = [{"name": name.strip()} for name in participants if name.strip()]

        if not event_name or not event_date or not event_location:
            messagebox.showerror("Error", "All fields must be filled!")
            return

        event_data = {
            "_id": new_id,
            "name": event_name,
            "date": event_date,
            "location": event_location,
            "menu": {
                "meats": selected_recipes,
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

    create_event_win = tk.Toplevel()
    create_event_win.title("Create Event")

    # Display new event ID
    tk.Label(create_event_win, text=f"New Event ID: {new_id}").grid(row=0, column=0, columnspan=2, pady=5)

    # Event Name
    tk.Label(create_event_win, text="Event Name:").grid(row=1, column=0, sticky=tk.W)
    event_name_entry = tk.Entry(create_event_win, width=30)
    event_name_entry.grid(row=1, column=1, pady=5)

    # Event Date
    tk.Label(create_event_win, text="Event Date:").grid(row=2, column=0, sticky=tk.W)
    event_date_entry = tk.Entry(create_event_win, width=30)
    event_date_entry.grid(row=2, column=1, pady=5)

    # Event Location
    tk.Label(create_event_win, text="Event Location:").grid(row=3, column=0, sticky=tk.W)
    event_location_entry = tk.Entry(create_event_win, width=30)
    event_location_entry.grid(row=3, column=1, pady=5)

    # Recipes
    tk.Label(create_event_win, text="Select Recipes:").grid(row=4, column=0, sticky=tk.W)
    recipes_listbox = tk.Listbox(create_event_win, selectmode=tk.MULTIPLE, width=30, height=5)
    recipes_listbox.grid(row=4, column=1, pady=5)
    for recipe in db["recipes"].find({}, {"_id": 1, "name": 1}):
        recipes_listbox.insert(tk.END, recipe["_id"])

    # Side Dishes
    tk.Label(create_event_win, text="Select Side Dishes:").grid(row=5, column=0, sticky=tk.W)
    side_dishes_listbox = tk.Listbox(create_event_win, selectmode=tk.MULTIPLE, width=30, height=5)
    side_dishes_listbox.grid(row=5, column=1, pady=5)
    for addition in db["additions"].find({}, {"_id": 1, "name": 1}):
        side_dishes_listbox.insert(tk.END, addition["_id"])

    # Participants
    tk.Label(create_event_win, text="Participants (one per line):").grid(row=6, column=0, sticky=tk.W)
    participants_text = tk.Text(create_event_win, width=30, height=5)
    participants_text.grid(row=6, column=1, pady=5)

    # Buttons
    tk.Button(create_event_win, text="Save to Mongo", command=save_event_to_mongo).grid(row=7, column=1, sticky=tk.E, pady=10, padx=5)
    tk.Button(create_event_win, text="Exit", command=create_event_win.destroy).grid(row=7, column=0, sticky=tk.W, pady=10, padx=5)

def main_window():
    root = tk.Tk()
    root.title("Event Management")

    tk.Button(root, text="Create Event", command=create_event_window).pack(pady=20)
    tk.Button(root, text="Exit", command=root.destroy).pack(pady=10)

    root.mainloop()

if __name__ == "__main__":
    main_window()
