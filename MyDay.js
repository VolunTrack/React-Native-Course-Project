import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Schedule Browsing Page
const ScheduleBrowsingPage = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Load events from AsyncStorage
    const loadEvents = async () => {
      const storedEvents = await AsyncStorage.getItem('events');
      if (storedEvents) setEvents(JSON.parse(storedEvents));
    };

    loadEvents();
  }, []);

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('EventDetails', { event: item })}>
          <Text>{item.name}</Text>
          {/* Display other event details */}
        </TouchableOpacity>
      )}
    />
  );
};

// Add and Edit Events Page
const EventFormPage = ({ route, navigation }) => {
  const [event, setEvent] = useState(route.params?.event || {});

  const saveEvent = async () => {
    // Save event to AsyncStorage
    const storedEvents = await AsyncStorage.getItem('events');
    let events = storedEvents ? JSON.parse(storedEvents) : [];
    if (event.id) {
      // Update existing event
      const index = events.findIndex((e) => e.id === event.id);
      events[index] = event;
    } else {
      // Add new event
      event.id = Date.now(); // Simple ID generation
      events.push(event);
    }
    await AsyncStorage.setItem('events', JSON.stringify(events));
    navigation.goBack();
  };

  return (
    <View>
      {/* Form fields to edit event name, type, time, and description */}
      <TouchableOpacity onPress={saveEvent}>
        <Text>Save Event</Text>
      </TouchableOpacity>
    </View>
  );
};

// Event Details Page
const EventDetailsPage = ({ route, navigation }) => {
  const { event } = route.params;

  const deleteEvent = async () => {
    // Delete event from AsyncStorage
    const storedEvents = await AsyncStorage.getItem('events');
    let events = storedEvents ? JSON.parse(storedEvents) : [];
    events = events.filter((e) => e.id !== event.id);
    await AsyncStorage.setItem('events', JSON.stringify(events));
    navigation.goBack();
  };

  return (
    <View>
      <Text>{event.name}</Text>
      {/* Display other event details */}
      <TouchableOpacity onPress={() => navigation.navigate('EventForm', { event })}>
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteEvent}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  // Add your styles here
});

export { ScheduleBrowsingPage, EventFormPage, EventDetailsPage };
