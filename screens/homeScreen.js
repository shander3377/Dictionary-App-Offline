
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
export default class HomeScreen extends React.Component {
    getWord = (word) => {
        var searchKeyword = word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword + ".json"
        return fetch(url)
            .then((data) => {
                if (data.status === 200) {
                    return data.json()
                } else {
                    return null
                }
            })
            .then((response) => {
                var responseObject = response
                if (responseObject) {
                    var wordData = responseObject.definitions[0]
                    var definition = wordData.description
                    var lexicalCategory = wordData.wordtype
                    this.setState({
                        "word": this.state.text,
                        "definition": definition,
                        "lexicalCategory": lexicalCategory
                    }) 
                } else {
                    this.setState({
                        "word": this.state.text,
                        "definition": "Error 404. Not found",
                 
                    }) 
                }
            })
    }
    constructor() {
        super();
        this.state = {
            text: '',
            isSearchPressed: false,
            word: "",
            lexicalCategory: "",
            examples: [],
            difinition: "",
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
                        difinition: ""
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
  