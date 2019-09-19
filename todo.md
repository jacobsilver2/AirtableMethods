# Airtable For Pete's Candy Store


## Methods To Update

---

>It's probably a good idea to start thinking about just making some general functions which accept other functions as input, which can be imported into other files.

## addEvent.js

- [x] After adding new event, ask user if they want to add an act.
- [x] User enters act email address (act name will be inferred from event name), a search is performed based on act name and email, if a value is returned, the user will be presented a list of returned values and choose which act to add.  If no values are returned, the act will be added to the database as a new act, and linked to the event.

---

## Methods To Add

- [x] changeDateAndTimeOfEvent.js
- [ ] getYesterdaysEventsAndAddReportAndDraw.js

## General Airtable Ideas

---

- [ ] Create a new form for each day so the staff can update draw and numbers.
- [ ] Create a form so Andy and Dave can create events and acts.
- [x] Create an automation which sends a confirmation email each time an event is added to airtable and marked as confirmed (and includes a linked act).  This form should also contain a dynamic link which allows the act to fill out a form for blurb, link and image.
- [x] Create an automation which sends a 3 week confirmation.
- [x] Create an automation which sends a 2 week confirmation.
- [x] Create an automation which sends a 1 week confirmation.
