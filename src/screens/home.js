import React, { Component } from 'react';
import { ScrollView, Text, View, TextInput, Button } from 'react-native'
import { EXAMPLE } from '../graphql/queries';
import { Query } from "react-apollo";
import { margin } from '../styles/theme';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: "burrito",
            location: "san francis"
        }
    }

    getYelp = () => {
        const { term, location } = this.state;
        const { navigate } = this.props.navigation;
        return (
            <Query query={EXAMPLE} variables={{ term, location }}>
                {({ loading, data: { search }, error }) => {

                    if (loading) {
                        return <Text>Loading...</Text>
                    }
                    if (search) {
                        const result = search.business.map((i, index) => {
                            return (
                                <View key={index}>
                                    <Text>{index + 1 + ". " + i.name}</Text>
                                    <Text>Rating: {i.rating} - Review: {i.review_count}</Text>
                                    <Text>{i.location.address1}</Text>
                                    <Button onPress={() => navigate('Review', { business: i.id, name: i.name })} title="See Reviews" />
                                </View>)
                        })
                        return result;
                    }
                    if (error)
                        return <Text>{error.message}</Text>

                    return (
                        <Text>No result</Text>
                    );
                }}
            </Query>
        )
    }

    render() {
        const { term } = this.state;
        return (
            <ScrollView>
                <View style={margin.marginM}>
                    <TextInput onChangeText={(term) => this.setState({ term })} value={term}></TextInput>
                    <Text>Result for: {this.state.term}</Text>
                    {this.getYelp("pizza", "new york")}
                </View>
            </ScrollView>
        )
    }
}