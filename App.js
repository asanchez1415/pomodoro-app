import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from './src/components/Header';
import Timer from './src/components/Timer';
import { Audio } from 'expo-av';

const colors = ['#F7DC6F', '#A2D9CE', '#D7BDE2'];
const listTimes = [1500, 300, 900];

export default function App() {
  const [time, setTime] = useState(1500);
  const [currentTime, setCurrentTime] = useState(0, 1, 2);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      // run timer
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setTime(listTimes[currentTime]);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  function handleStartStop() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/bubble.mp3')
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: colors[currentTime] }]}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Pomodoro</Text>

        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
        />

        <Timer time={time} />

        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {isActive ? 'STOP' : 'START'}
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' && 30,
    paddingHorizontal: 15,
    flex: 1,
  },
  root: {
    flex: 1,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
});
