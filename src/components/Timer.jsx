import { StyleSheet, Text, View } from 'react-native';

export default function Timer(props) {
  const formattedTime = `${Math.floor(props.time / 60)
    .toString()
    .padStart(2, '0')}:${(props.time % 60).toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formattedTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    padding: 15,
    borderRadius: 15,
  },
  time: {
    fontSize: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
});
