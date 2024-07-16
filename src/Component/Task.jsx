import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = ({ task, onDelete, onUpdateStatus }) => {
  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskDetails}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskDescription}>{task.description}</Text>
        <Text style={styles.taskDueDate}>{task.dueDate}</Text>
        <Text style={styles.taskStatus}>{task.status}</Text>
      </View>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => onUpdateStatus(task.id)}>
          <Text style={styles.actionButton}>Toggle Status</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Text style={styles.actionButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    // borderColor: '#ccc',
    // backgroundColor:"pink",
    margin:5,
    borderRadius:5,
   
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#555',
  },
  taskDueDate: {
    fontSize: 12,
    color: '#999',
  },
  taskStatus: {
    fontSize: 14,
    color: '#999',
  },
  taskActions: {
    justifyContent: 'center',
  },
  actionButton: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 8,
  },
});

export default Task;
