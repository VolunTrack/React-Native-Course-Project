import React from 'react';
import {Text,View,StyleSheet,FlatList} from 'react-native';
import {Calendar} from 'react-native-calendars';

const App = () =>{
    const[ShowCalendar,setShowCalendar] = useState(false)
    const [assignments,setAssignments] = useState('')


                    
    
    return(
        <View>
            <TextInput 
            placeholder = "Type your schedule here....."
            onChangeText = {setAssignments}
            value = {assignments}
            />
            
            <TouchableOcapicity 
            onPress = {() => SetShowCalendar(true)} 
            style = {{
                backgroundColor: 'black',
                borderRaiuds: 10, 
                margin: 30}}>
                <Text style = {{color:'white',fontSize:20}}>Calendar</Text>
            </TouchableOcapicity>
            
            <Modal visible = {ShowCalendar} animationType = 'fade'>
                <Calendar style = {{borderRadius: 8, margin: 40}}
                onDayPress={date =>{
                    console.log(date)
                    setShowCalendar(false)
                }}
                initialDate = {'2024-06-16'}

                noteDate={{
                    '2024-06-16':{marked:true, dotColor:'red',selected:true,
                        selcetedColor:'purple',selectedTextColor:'white'
                    }
                    
                }}

                
                    />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({})

export default App;