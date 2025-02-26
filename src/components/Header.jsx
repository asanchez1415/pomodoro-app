import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const options = ['Pomodoro', 'Break', 'Long Break'];

export default function Header(props) {
  function handlePress(index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : index === 2 && 15;
    props.setCurrentTime(index);
    props.setTime(newTime * 60);
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {options.map((option, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.itemStyle,
              props.currentTime !== index && { borderColor: 'transparent' },
            ]}
            onPress={() => handlePress(index)}
          >
            <Text style={{ fontWeight: 'bold' }}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    width: '33%',
    alignItems: 'center',
    borderWidth: 3,
    padding: 5,
    borderRadius: 10,
    borderColor: 'white',
    marginVertical: 20,
  },
});
