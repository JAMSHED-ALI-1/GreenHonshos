import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getTasks, storeTasks } from '../../utils/storage';
import Task from '../Component/Task';
import { showMessage } from 'react-native-flash-message';
import Custominput from '../Component/Custominput';
import CustomButton from '../Component/Custombutton';
import Colors from '../Constant/Colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [filter, setFilter] = useState('all');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const storedTasks = await getTasks();
    // console.log('Loaded tasks:', storedTasks);
    setTasks(storedTasks);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDueDate(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const addTask = async () => {
    if (!title || !description || !dueDate) {
      setErrorMessage('All fields are required');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      status
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await storeTasks(updatedTasks);
    setTitle('');
    setDescription('');
    setDueDate('');
    setErrorMessage('');
    showMessage({
      message: 'Task added successfully',
      type: 'success'
    });
  };

  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    await storeTasks(updatedTasks);
    showMessage({
      message: 'Task deleted successfully',
      type: 'success'
    });
  };

  const updateTaskStatus = async (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        task.status = task.status === 'pending' ? 'completed' : 'pending';
      }
      return task;
    });
    // console.log('Updated tasks:', updatedTasks);
    setTasks(updatedTasks);
    await storeTasks(updatedTasks);
    showMessage({
      message: 'Task status updated',
      type: 'success'
    });
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

//   console.log('Filtered tasks:', filteredTasks);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Manager</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <Custominput
        PlaceHolder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <Custominput
        PlaceHolder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity onPress={showDatePicker}>
        <View pointerEvents="none">
          <Custominput
            PlaceHolder="Due Date"
            value={dueDate}
            onChangeText={setDueDate}
          />
        </View>
      </TouchableOpacity>
      <CustomButton title="Add Task" textColor="white" bgColor={Colors.blue} onPress={addTask} />
      <View style={styles.filters}>
        <TouchableOpacity onPress={() => setFilter('all')}>
          <Text style={[styles.filterButton, filter === 'all' && styles.activeFilter]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('pending')}>
          <Text style={[styles.filterButton, filter === 'pending' && styles.activeFilter]}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('completed')}>
          <Text style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}>Completed</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTasks}
        style={{marginBottom:90}}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Task task={item} onDelete={deleteTask} onUpdateStatus={updateTaskStatus} />
        )}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f1f1f1',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 16,
    marginTop:40
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  filterButton: {
    marginHorizontal: 8,
    fontSize: 16,
    color: '#007BFF',
  },
  activeFilter: {
    fontWeight: 'bold',
  },
});

export default TaskManager;
