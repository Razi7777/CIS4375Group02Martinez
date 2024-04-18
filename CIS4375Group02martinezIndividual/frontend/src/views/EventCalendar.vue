<template>
  <main>
  <div class="event-calendar-wrapper">
    <div class="event-calendar">
      <div class="announcement" v-if="upcomingEvents.length > 0">
        <div class="announcement-header">
          <h3>Upcoming Event</h3>
          <div class="ribbon">New</div>
        </div>
        <div v-for="(event, index) in upcomingEvents" :key="index">
          <p class="event-description">{{ event.Event_Description }}</p>
          <div class="event-details">
            <p>
              <strong>Date:</strong> {{ formatDateTime(event.Event_Date) }}
            </p>
            <p>
              <strong>Address:</strong> {{ event.Address }},
              {{ event.City }}, {{ event.Zipcode }}
            </p>
          </div>
          <hr v-if="index < upcomingEvents.length - 1">
        </div>
        <span class="star" v-for="n in 20" :key="n" :style="{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }">★</span>
      </div>

      <div class="calendar">
        <div class="calendar-header">
          <h2>Event Calendar</h2>
          <div class="month-switcher">
            <button class="prev-month" @click="previousMonth">
              <i class="fas fa-caret-up"></i>
            </button>
            <span class="current-month">{{ currentMonth }}</span>
            <button class="next-month" @click="nextMonth">
              <i class="fas fa-caret-down"></i>
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr class="weekdays">
              <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="week in calendarWeeks" :key="week">
              <td
                v-for="day in week"
                :key="day.date"
                :class="{ 'event-day': day.hasEvent, 'today': isToday(day.date) }"
                @click="showEventDetails(day)"
              >
                <span class="day-number">{{ day.date }}</span>
                <div class="event-indicator" v-if="day.hasEvent"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="event-details-popup" v-if="selectedEvent" @click.self="hideEventDetails">
        <div class="popup-content">
          <div class="popup-header">
            <h4>{{ selectedEvent.Event_Description }}</h4>
            <button class="close-btn" @click="hideEventDetails">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="popup-body">
            <p><strong>Date:</strong> {{ formatDateTime(selectedEvent.Event_Date) }}</p>
            <p>
              <strong>Address:</strong> {{ selectedEvent.Address }},
              {{ selectedEvent.City }}, {{ selectedEvent.Zipcode }}
            </p>
            <p><strong>Category:</strong> {{ getEventCategory(selectedEvent.Event_Category_ID) }}</p>
            <p><strong>Status:</strong> {{ getEventStatus(selectedEvent.Event_Status_ID) }}</p>
          </div>
        </div>
      </div>
      <br>
      <div class="event-list-form-wrapper" v-if="user.username === 'Admin'">
        <div class="event-list-container">
          <div class="event-list fancy-container">
            <h3><strong><center>Event List</center></strong></h3>
            <center><button class="fancy-button" @click="fetchAllEvents">Fetch All Events</button></center>
            <br>
            <table v-if="allEvents.length > 0">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Address</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="event in allEvents" :key="event.Event_ID">
                  <td>{{ formatDateTime(event.Event_Date) }}</td>
                  <td>{{ event.Event_Description }}</td>
                  <td>{{ getFullAddress(event) }}</td>
                  <td>{{ getEventCategory(event.Event_Category_ID) }}</td>
                  <td>{{ getEventStatus(event.Event_Status_ID) }}</td>
                </tr>
              </tbody>
            </table>
            <p v-else>No events found. Click the "Fetch All Events" button to load events.</p>
          </div>
        </div>

        <div class="event-form-container">
          <div class="event-update-form-header">
            <h3><strong>Create Event</strong></h3>
          </div>
          <div class="event-form fancy-container">
            <form class="fancy-form" @submit.prevent="createEvent">
              <div class="form-group">
                <label for="eventDate">Date:</label>
                <input type="date" id="eventDate" v-model="newEvent.Event_Date" required>
              </div>
              <div class="form-group">
                <label for="eventAddress">Physical or Virtual Address:</label>
                <input type="text" id="eventAddress" v-model="newEvent.Address" required>
              </div>
              <div class="form-group">
                <label for="eventCity">City:</label>
                <input type="text" id="eventCity" v-model="newEvent.City" required>
              </div>
              <div class="form-group">
                <label for="eventZipcode">Zipcode:</label>
                <input type="text" id="eventZipcode" v-model="newEvent.Zipcode" required>
              </div>
              <div class="form-group">
                <label for="eventDescription">Description:</label>
                <textarea id="eventDescription" v-model="newEvent.Event_Description" required></textarea>
              </div>
              <div class="form-group">
                <label for="eventCategory">Category:</label>
                <select id="eventCategory" v-model="newEvent.Event_Category_ID" required>
                  <option v-for="category in eventCategories" :key="category.Event_Category_ID" :value="category.Event_Category_ID">
                    {{ category.Event_Category }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="eventStatus">Status:</label>
                <select id="eventStatus" v-model="newEvent.Event_Status_ID" required>
                  <option v-for="status in eventStatuses" :key="status.Event_Status_ID" :value="status.Event_Status_ID">
                    {{ status.Event_Status }}
                  </option>
                </select>
              </div>
              <button type="submit" class="fancy-button">Create Event</button>
            </form>
            <p v-if="createEventNotice" :class="{ 'success-notice': createEventSuccess, 'error-notice': !createEventSuccess }">
              {{ createEventNotice }}
            </p>
          </div>
        </div>

        <div class="event-update-form-container">
          <div class="event-update-form-header">
            <h3><strong>Update Event</strong></h3>
          </div>
          <div class="event-update-form fancy-container">
            <form class="fancy-form" @submit.prevent="updateEvent">
              <div class="form-group">
                <label for="eventToUpdate">Select:</label>
                <select id="eventToUpdate" v-model="selectedEventId" required>
                  <option value="">Select an event</option>
                  <option v-for="event in allEventsForUpdate" :key="event.Event_ID" :value="event.Event_ID">
                    {{ event.Event_Description }} - {{ formatDateTime(event.Event_Date) }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="updateEventStatus">Status:</label>
                <select id="updateEventStatus" v-model="updateEventStatus">
                  <option v-for="status in eventStatuses" :key="status.Event_Status_ID" :value="status.Event_Status_ID">
                    {{ status.Event_Status }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="updateEventCategory">Category:</label>
                <select id="updateEventCategory" v-model="updateEventCategory">
                  <option v-for="category in eventCategories" :key="category.Event_Category_ID" :value="category.Event_Category_ID">
                    {{ category.Event_Category }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="updateEventDate">Date:</label>
                <input type="date" id="updateEventDate" v-model="updateEventDate">
              </div>
              <div class="form-group">
                <label for="updateEventDescription">Description:</label>
                <textarea id="updateEventDescription" v-model="updateEventDescription"></textarea>
              </div>
              <div class="form-group">
                <label for="updateEventAddress">Physical or Virtual Address:</label>
                <input type="text" id="updateEventAddress" v-model="updateEventAddress">
              </div>
              <div class="form-group">
                <label for="updateEventCity">City:</label>
                <input type="text" id="updateEventCity" v-model="updateEventCity">
              </div>
              <div class="form-group">
                <label for="updateEventZipcode">Zipcode:</label>
                <input type="text" id="updateEventZipcode" v-model="updateEventZipcode">
              </div>
              <button type="submit" class="fancy-button">Update Event</button>
            </form>
            <p v-if="updateEventNotice" :class="{ 'success-notice': updateEventSuccess, 'error-notice': !updateEventSuccess }">
              {{ updateEventNotice }}
            </p>
          </div>
        </div>

        <div class="event-delete-form-container">
          <div class="event-delete-form-header">
            <h3><strong>Delete Event</strong></h3>
          </div>
          <div class="event-delete-form fancy-container">
            <form class="fancy-form" @submit.prevent="deleteEvent">
              <div class="form-group">
                <label for="eventToDelete">Select:</label>
                <select id="eventToDelete" v-model="selectedEventIdToDelete" required>
                  <option value="">Select an event</option>
                  <option v-for="event in allEventsForUpdate" :key="event.Event_ID" :value="event.Event_ID">
                    {{ event.Event_Description }} - {{ formatDateTime(event.Event_Date) }}
                  </option>
                </select>
              </div>
              <button type="submit" class="fancy-button">Delete Event</button>
            </form>
            <p v-if="deleteEventNotice" :class="{ 'success-notice': deleteEventSuccess, 'error-notice': !deleteEventSuccess }">
              {{ deleteEventNotice }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<script>
import axios from 'axios';
import { useLoggedInUserStore } from '../store/loggedInUser';

export default {
  setup() {
    const user = useLoggedInUserStore();
    return { user };
  },
  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      events: [],
      eventCategories: [
        { Event_Category_ID: 1, Event_Category: 'Marketing/Promo Events' },
        { Event_Category_ID: 2, Event_Category: 'Social Media Live Events' },
        { Event_Category_ID: 3, Event_Category: 'Farmer\'s Market/Festival' }
      ],
      eventStatuses: [
        { Event_Status_ID: 1, Event_Status: 'Booked' },
        { Event_Status_ID: 2, Event_Status: 'Cancelled' },
        { Event_Status_ID: 3, Event_Status: 'Postponed' },
        { Event_Status_ID: 4, Event_Status: 'Completed' }
      ],
      selectedEvent: null,
      allEvents: [],
      newEvent: {
        Event_Date: '',
        Address: '',
        City: '',
        Zipcode: '',
        Event_Description: '',
        Event_Category_ID: null,
        Event_Status_ID: null
      },
      allEventsForUpdate: [],
      createEventNotice: '',
      createEventSuccess: false,
      selectedEventId: '',
      updateEventCategory: null,
      updateEventStatus: null,
      updateEventDate: '',
      updateEventDescription: '',
      updateEventAddress: '',
      updateEventCity: '',
      updateEventZipcode: '',
      updateEventNotice: '',
      updateEventSuccess: false,
      selectedEventIdToDelete: '',
      deleteEventNotice: '',
      deleteEventSuccess: false,
    };
  },
  computed: {
    currentMonth() {
      return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    },
    calendarWeeks() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const numDays = lastDay.getDate();

      let date = 1;
      const weeks = [];

      for (let i = 0; i < 6; i++) {
        const week = [];

        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay.getDay()) {
            week.push({ date: '' });
          } else if (date > numDays) {
            week.push({ date: '' });
          } else {
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
            const event = this.events.find(event => event.Event_Date.startsWith(dateString));
            week.push({
              date,
              hasEvent: !!event,
              event
            });
            date++;
          }
        }

        weeks.push(week);
        if (date > numDays) break;
      }

      return weeks;
    },
    upcomingEvents() {
      const today = new Date();
      const twoMonthsLater = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());
      return this.events.filter(event => {
        const eventDate = new Date(event.Event_Date);
        return eventDate >= today && eventDate <= twoMonthsLater && event.Event_Status_ID === 1;
      });
    },
    getFullAddress() {
      return (event) => {
        return `${event.Address}, ${event.City}, ${event.Zipcode}`;
      };
    }
  },
  methods: {
    previousMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    },
    showEventDetails(day) {
      if (day.hasEvent) {
        this.selectedEvent = day.event;
      }
    },
    hideEventDetails() {
      this.selectedEvent = null;
    },
    formatDateTime(dateTime) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };
      return new Date(dateTime).toLocaleString('en-US', options);
    },
    isToday(date) {
      const today = new Date();
      return (
        date === today.getDate() &&
        this.currentDate.getMonth() === today.getMonth() &&
        this.currentDate.getFullYear() === today.getFullYear()
      );
    },
    getEventCategory(categoryId) {
      const category = this.eventCategories.find(cat => cat.Event_Category_ID === categoryId);
      return category ? category.Event_Category : '';
    },
    getEventStatus(statusId) {
      const status = this.eventStatuses.find(stat => stat.Event_Status_ID === statusId);
      return status ? status.Event_Status : '';
    },
    fetchAllEvents() {
      axios.get('http://localhost:3000/api/events')
        .then(response => {
          this.allEvents = response.data.sort((a, b) => new Date(a.Event_Date) - new Date(b.Event_Date));
          this.allEventsForUpdate = response.data.sort((a, b) => new Date(a.Event_Date) - new Date(b.Event_Date));
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        });
    },
    createEvent() {
      axios.post('http://localhost:3000/api/events', this.newEvent)
        .then(response => {
          console.log('Event created:', response.data);
          this.createEventNotice = 'Event created successfully';
          this.createEventSuccess = true;
          this.newEvent = {
            Event_Date: '',
            Address: '',
            City: '',
            Zipcode: '',
            Event_Description: '',
            Event_Category_ID: null,
            Event_Status_ID: null
          };
          this.fetchAllEvents();
          
          // Fetch the newly created event from the API
          axios.get(`http://localhost:3000/api/events/${response.data.Event_ID}`)
          .then(response => {
            const newEvent = response.data;
            // Add the new event to the events array
            this.events.push(newEvent);
          })
          .catch(error => {
          console.error('Error fetching the newly created event:', error);
          });
        })  
        .catch(error => {
          console.error('Error creating event:', error);
          this.createEventNotice = 'Failed to create event';
          this.createEventSuccess = false;
        });
    },
    updateEvent() {
      if (this.selectedEventId) {
        const updatedProperties = {};

        // Get the current event from the allEvents array
        const currentEvent = this.allEvents.find(event => event.Event_ID === this.selectedEventId);

        // Add properties to the updatedProperties object based on the selected values
        if (this.updateEventStatus !== null) {
          updatedProperties.Event_Status_ID = this.updateEventStatus;
        } else {
          updatedProperties.Event_Status_ID = currentEvent.Event_Status_ID; // Keep the current value
        }

        if (this.updateEventCategory !== null) {
          updatedProperties.Event_Category_ID = this.updateEventCategory;
        } else {
          updatedProperties.Event_Category_ID = currentEvent.Event_Category_ID; // Keep the current value
        }

        if (this.updateEventDate) {
          // Convert the selected date to ISO 8601 format
          const eventDate = new Date(this.updateEventDate);
          updatedProperties.Event_Date = eventDate.toISOString();
        } else {
          updatedProperties.Event_Date = currentEvent.Event_Date; // Keep the current value
        }

        if (this.updateEventDescription) {
        updatedProperties.Event_Description = this.updateEventDescription;
        } else {
          updatedProperties.Event_Description = currentEvent.Event_Description; // Keep the current value
        }
        
        // Include Address, City, and Zipcode in the updatedProperties object
        if (this.updateEventAddress) {
          updatedProperties.Address = this.updateEventAddress;
        } else {
          updatedProperties.Address = currentEvent.Address; // Keep the current value
        }

        if (this.updateEventCity) {
          updatedProperties.City = this.updateEventCity;
        } else {
          updatedProperties.City = currentEvent.City; // Keep the current value
        }

        if (this.updateEventZipcode) {
          updatedProperties.Zipcode = this.updateEventZipcode;
        } else {
          updatedProperties.Zipcode = currentEvent.Zipcode; // Keep the current value
        }

        axios.put(`http://localhost:3000/api/events/${this.selectedEventId}`, updatedProperties)
          
          .then(response => {
            console.log('Event updated:', response.data);
            this.updateEventNotice = 'Event updated successfully';
            this.updateEventSuccess = true;

            // Find the index of the updated event in the allEventsForUpdate array
            const eventIndexForUpdate = this.allEventsForUpdate.findIndex(event => event.Event_ID === this.selectedEventId);
        
            if (eventIndexForUpdate !== -1) {
              // Update the event properties in the allEventsForUpdate array
              this.allEventsForUpdate[eventIndexForUpdate] = { ...this.allEventsForUpdate[eventIndexForUpdate], ...updatedProperties };
            }

            // Find the index of the updated event in the allEvents array
            const eventIndexForList = this.allEvents.findIndex(event => event.Event_ID === this.selectedEventId);

            if (eventIndexForList !== -1) {
              // Update the event properties in the allEvents array
              this.allEvents[eventIndexForList] = { ...this.allEvents[eventIndexForList], ...updatedProperties };
            }

            // Fetch the updated event data from the API
            axios.get(`http://localhost:3000/api/events/${this.selectedEventId}`)
              .then(response => {
                const updatedEvent = response.data;

                // Find the index of the updated event in the events array
                const upcomingEventIndex = this.events.findIndex(event => event.Event_ID === this.selectedEventId);

                if (upcomingEventIndex !== -1) {
                  // Update the event in the events array with the fetched data
                  this.events.splice(upcomingEventIndex, 1, updatedEvent);
                } else {
                  // Add the updated event to the events array
                  this.events.push(updatedEvent); 
                }
              })
          })
          .catch(error => {
            console.error('Error updating event:', error);
            this.updateEventNotice = 'Failed to update event';
            this.updateEventSuccess = false;
          });
      }
    },
    deleteEvent() {
    if (this.selectedEventIdToDelete) {
      axios.delete(`http://localhost:3000/api/events/${this.selectedEventIdToDelete}`)
        .then(response => {
          console.log('Event deleted:', response.data);
          this.deleteEventNotice = 'Event deleted successfully';
          this.deleteEventSuccess = true;

          // Remove the deleted event from the allEventsForUpdate array
          const deletedEventIndex = this.allEventsForUpdate.findIndex(event => event.Event_ID === this.selectedEventIdToDelete);
          if (deletedEventIndex !== -1) {
            this.allEventsForUpdate.splice(deletedEventIndex, 1);
          }

          // Remove the deleted event from the allEvents array
          const deletedEventIndexForList = this.allEvents.findIndex(event => event.Event_ID === this.selectedEventIdToDelete);
          if (deletedEventIndexForList !== -1) {
            this.allEvents.splice(deletedEventIndexForList, 1);
          }

          // Remove the deleted event from the events array
          const deletedUpcomingEventIndex = this.events.findIndex(event => event.Event_ID === this.selectedEventIdToDelete);
          if (deletedUpcomingEventIndex !== -1) {
            this.events.splice(deletedUpcomingEventIndex, 1);
          }
        })
        .catch(error => {
          console.error('Error deleting event:', error);
          this.deleteEventNotice = 'Failed to delete event';
          this.deleteEventSuccess = false;
        });
      }
  },
  },
  created() {
    axios.get('http://localhost:3000/api/events')
      .then(response => {
        this.events = response.data;
        this.allEventsForUpdate = response.data; // Store the fetched events in allEventsForUpdate
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');

.event-calendar-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex-grow: 1;

}

.event-calendar {
  font-family: 'Playfair Display', serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  height: fit-content;
}

.event-list-form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-list-container,
.event-form-container,
.event-update-form-container {
  display: flex;
  flex-direction: column;
  margin-top: 0;
}

.event-update-form-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.event-form,
.event-update-form {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  align-items: start;
}

.event-update-form-header h3 {
  margin: 0;
}

.event-update-form h3 {
  margin-bottom: 10px;
}

.event-form h3,
.event-update-form h3 {
  margin-bottom: 10px;
  text-align: left;
}

.fancy-container {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fancy-button {
  background-color: #F07F7F;
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.fancy-button[type="submit"] {
  grid-column: span 2;
  justify-self: center;
  width: 50%;
  padding: 8px 16px;
  font-size: 14px;
}

.fancy-button:hover {
  background-color: #F07F7F;
}

.fancy-form {
  display: grid;
  grid-gap: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: auto 50%;
  padding-right: 28px;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}
.announcement {
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  animation: bling-bling 2s linear infinite;
}
.announcement-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.announcement-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
  font-family: 'Playfair Display', serif;
}
.announcement::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3));
  transform: rotate(45deg);
  pointer-events: none;
  animation: glow 5s linear infinite;
}

.announcement::after {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px dashed rgba(240, 127, 127, 0.8);
  border-radius: 12px;
  pointer-events: none;
  z-index: -1;
}

.announcement .star {
  position: absolute;
  font-size: 12px;
  color: rgba(255, 215, 0, 0.8);
  pointer-events: none;
  animation: twinkle 2s linear infinite;
}

@keyframes bling-bling {
  0%, 100% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 10px rgba(240, 127, 127, 0.8);
  }
  50% {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 20px rgba(240, 127, 127, 0.8);
  }
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.2;
  }
}
.ribbon {
  background-color: #F07F7F;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}
.event-description {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 10px;
  font-family: 'Playfair Display', serif;
}
.event-details {
  display: flex;
  justify-content: space-between;
}
.event-details p {
  margin: 0;
  color: #777;
}
.event-details strong {
  color: #333;
}
.calendar {
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.calendar-header {
  background-color: #f8d7da;
  color: #721c24;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.calendar-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-family: 'Playfair Display', serif;
  font-weight: bolder;
  font-family: cursive;
}
.month-switcher {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.month-switcher button {
  background-color: transparent;
  border: none;
  color: #333;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color 0.3s ease;
}
.month-switcher button:hover {
  color: #F07F7F;
}
.month-switcher .current-month {
  margin: 0 8px;
  font-size: 1rem;
  font-family: 'Playfair Display', serif;
}
table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  border: 1px solid #ccc;
}
th,
td {
  padding: 12px;
  text-align: center;
  position: relative;
  border: 1px solid #ccc;
}
.weekdays th {
  background-color: #f5f5f5;
  font-weight: bold;
  color: #333;
  border: 1px solid #ccc;
  font-family: 'Playfair Display', serif;
}
.event-day {
  background-color: #e0f0ff;
  cursor: pointer;
}
.today {
  background-color: #ffd699;
}
.day-number {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 50%;
  font-size: 0.9rem;
  color: #333;
  font-family: 'Playfair Display', serif;
}
.event-details-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.event-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #F07F7F;
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
}
.popup-content {
  background-color: #fff;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.popup-header {
  background-color: #333;
  color: #fff;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.popup-header h4 {
  margin: 0;
  font-size: 1.2rem;
  font-family: 'Playfair Display', serif;
}
.close-btn {
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
}
.popup-body {
  padding: 16px;
}
.popup-body p {
  margin: 8px 0;
}
.popup-body strong {
  color: #333;
}

.success-notice {
  color: green;
}

.error-notice {
  color: red;
}
</style>