import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getTasks } from '../../utils/storage';
import moment from 'moment';

const Dashboard = ({ navigation }) => {
  const [tasksDueToday, setTasksDueToday] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadTasks);
    return unsubscribe;
  }, [navigation]);

  const loadTasks = async () => {
    const storedTasks = await getTasks();
    const today = moment().startOf('day');
    const dueToday = storedTasks.filter(task => moment(task.dueDate).isSame(today, 'day'));
    const upcoming = storedTasks.filter(task => moment(task.dueDate).isAfter(today, 'day'));
    setTasksDueToday(dueToday);
    setUpcomingTasks(upcoming);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Tasks Due Today</Text>
        {tasksDueToday.length > 0 ? (
          tasksDueToday.map(task => (
            <TouchableOpacity key={task.id} onPress={() => navigation.navigate('TaskManager', { task })}
            style={{borderWidth:1,padding:20,margin:6,borderRadius:10}}>
              <Text style={styles.task}>{task.title} - {moment(task.dueDate).format('MMM DD, YYYY')}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noTasks}>No tasks due today</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Upcoming Tasks</Text>
        {upcomingTasks.length > 0 ? (
          upcomingTasks.map(task => (
            <TouchableOpacity key={task.id} onPress={() => navigation.navigate('TaskManager', { task })} style={{borderWidth:1,padding:20,margin:6,borderRadius:10}}>
              <Text style={styles.task}>{task.title} - {moment(task.dueDate).format('MMM DD, YYYY')}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noTasks}>No upcoming tasks</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 16,
    marginTop:40
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  task: {
    fontSize: 16,
    marginBottom: 4,
  },
  noTasks: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#999',
  },
});

export default Dashboard;
