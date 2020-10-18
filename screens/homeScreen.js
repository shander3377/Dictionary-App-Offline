
import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {
    Header
} from 'react-native-elements';
import dictionary from '../db';
import db from '../db';
export default class HomeScreen extends React.Component {
    getWord = (word) => {
        var searchKeyword = word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword + ".json"
      
            try{
                var word = db[searchKeyword]["word"]
                var lexicalCategory = db[searchKeyword]["lexicalCategory"]
                var definition = db[searchKeyword]["definition"]
                this.setState({
                "word": word,
                "lexicalCategory": lexicalCategory,
            "definition": definition,
                })
            } catch(err){
                alert("Sorry this word is not available in the dictionary for now")
                this.setState({
                    'text': '',
                    'isSearchPressed': false,
                })
            }
    }
    constructor() {
        super();
        this.state = {
            text: '',
            isSearchPressed: false,
            word: "",
            lexicalCategory: "",
            examples: [],
            definition: "",
        };
    }
    render() {
        return ( 
            <View> 
                  <Header
          backgroundColor={"#9c8210"}
          centerComponent={{
            text: "Dictionary App",
            style: { color: "#fff", fontSize: 20 },
          }}
        />
            <TextInput style = {
                styles.inputBox
            }
            onChangeText = {
                text => {
                    this.setState({
                        text: text,
                        isSearchPressed: false,
                        word: "loading....",
                        lexicalCategory: "",
                        examples: [],
                        definition: ""
                    });
                }
            }
            value = {
                this.state.text
            }
            /> 
            <TouchableOpacity style = {
                styles.searchButton
            }
            onPress = {
                () => {
                    this.setState({
                        isSearchPressed: true
                    })
                    this.getWord(this.state.text)
                }
            }> <Text style={styles.buttonText}>Search</Text> </TouchableOpacity> 
            <View style={[styles.deatailContainer]}>
<Text style={[styles.deatailContainer, {fontSize: 30,}, {marginLeft: 40}, {color: 'yellow'}, {fontWeight: 'bold'}]}> Word: {""}</Text>
<Text style={[styles.deatailContainer, {fontSize: 20}, {marginLeft: 40}]}> {this.state.word}</Text>
            </View>
               <View style={styles.deatailContainer}>
               <Text style={[styles.deatailContainer, {fontSize: 30,}, {marginLeft: 40}, {color: 'yellow'}, {fontWeight: 'bold'}]}> Type: {""}</Text>
               <Text style={[styles.deatailContainer, {fontSize: 20}, {marginLeft: 40}]}> {this.state.lexicalCategory}</Text>
                           </View>
                            <View style={{flexDirection:'row'}, {flexWrap: 'wrap'}}>
                            <Text style={[styles.deatailContainer, {fontSize: 30,}, {marginLeft: 40}, {color: 'yellow'}, {fontWeight: 'bold'}]}> Definition: {""}</Text>
                            <Text style={[styles.deatailContainer, {fontSize: 20}, {marginLeft: 40}]}> {this.state.definition}</Text>
                                        </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  
    inputBox: {
      marginTop: 100,
      width: '80%',
      alignSelf: 'center',
      height: 40,
      textAlign: 'center',
      borderWidth: 4,
      outline: 'none',
    },
    searchButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 15,
        marginTop: 50,
        width: 200,
        height: 50,
        alignItems:  'center',
backgroundColor: 'blue'
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
    },
 

  });
  
