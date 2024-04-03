<template>
    <div class="event-calendar">
      <div class="announcement" v-if="upcomingEvent">
        <div class="announcement-header">
          <h3>Upcoming Event</h3>
          <div class="ribbon">New</div>
        </div>
        <p class="event-description">{{ upcomingEvent.Event_Description }}</p>
        <div class="event-details">
          <p>
            <strong>Date:</strong> {{ formatDate(upcomingEvent.Date) }}
          </p>
          <p>
            <strong>Address:</strong> {{ upcomingEvent.Address }},
            {{ upcomingEvent.City }}, {{ upcomingEvent.Zipcode }}
          </p>
        </div>
      </div>
  
      <div class="calendar">
        <div class="calendar-header">
          <h2>Event Calendar</h2>
          <div class="month-switcher">
            <button class="prev-month" @click="previousMonth">
                <i class="fas fa-chevron-left"></i>
            </button>
            <span class="current-month">{{ currentMonth }}</span>
            <button class="next-month" @click="nextMonth">
              <i class="fas fa-chevron-right"></i>
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
                <p><strong>Date:</strong> {{ formatDate(selectedEvent.Date) }}</p>
                <p>
                    <strong>Address:</strong> {{ selectedEvent.Address }},
                    {{ selectedEvent.City }}, {{ selectedEvent.Zipcode }}
                </p>
                <p><strong>Category:</strong> {{ getEventCategory(selectedEvent.Event_Category_ID) }}</p>
                <p><strong>Status:</strong> {{ getEventStatus(selectedEvent.Event_Status_ID) }}</p>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import mysql from 'mysql';

  export default {
  data() {
    return {
      currentDate: new Date(),
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      events: [
        {
          Event_ID: 13,
          Event_Category_ID: 3,
          Event_Status_ID: 1,
          Date: '2024-04-30',
          Address: '234 Matlage Way',
          City: 'Sugarland',
          Zipcode: '77478',
          Event_Description: 'Festival event is booked for future date'
        },
        {
          Event_ID: 14,
          Event_Category_ID: 3,
          Event_Status_ID: 1,
          Date: '2024-05-05',
          Address: '2504 Amherst St',
          City: 'Houston',
          Zipcode: '77005',
          Event_Description: 'Farmer\'s Market event is booked for future date'
        },
      ],
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
      selectedEvent: null
    };
  },
  mounted() {
    this.connectToDatabase();
  },
  methods: {
    connectToDatabase() {
      const connection = mysql.createConnection({
        host: 'mycis4375db.cjucgyawuzby.us-east-1.rds.amazonaws.com',
        user: 'admin',
        password: 'P1649320p!',
        database: 'nincompoopDB'
      });

      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to database:', err);
          return;
        }
        console.log('Connected to database!');
        // You can now execute SQL queries using the connection object
        connection.query('SELECT * FROM nincompoopDB.Event', (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            return;
          }
          console.log('Query results:', results);
        });
      });
    },
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
              const event = this.events.find(event => event.Date === dateString);
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
      upcomingEvent() {
        const today = new Date();
        return this.events.find(event => new Date(event.Date) >= today);
      }
    },
    methods: {
      previousMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
      },
      nextMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
      },
      previousYear() {
        this.currentDate = new Date(this.currentDate.getFullYear() - 1, this.currentDate.getMonth(), 1);
      },
      nextYear() {
        this.currentDate = new Date(this.currentDate.getFullYear() + 1, this.currentDate.getMonth(), 1);
      },
      showEventDetails(day) {
        if (day.hasEvent) {
            this.selectedEvent = day.event;
        }
      },
      hideEventDetails() {
        this.selectedEvent = null;
      },
      formatDate(date) {
        const [year, month, day] = date.split('-');
        return `${month}/${day}/${year}`;
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
      }
    }
  };
  </script>
  
<style scoped>
.event-calendar {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.announcement {
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
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
}

.ribbon {
  background-color: #ff6347;
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
  background-color: #333;
  color: #fff;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calendar-header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.month-switcher {
  display: flex;
  align-items: center;
}

.month-switcher button {
  background-color: #ff6347;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
}

.month-switcher .current-month {
  margin: 0 8px;
  font-size: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th,
td {
  padding: 12px;
  text-align: center;
  position: relative;
}

.weekdays th {
  background-color: #f5f5f5;
  font-weight: bold;
  color: #333;
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
  background-color: #ff6347;
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
</style>