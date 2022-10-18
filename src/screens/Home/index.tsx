import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
} from "react-native";
import { Participant } from "../../components/Participant";
import { styles } from './styles';

export function Home() {
    const [participants, setParticipants] = useState<string[]>([])
    const [participantName, setParticipantName] = useState('')

    function handleParticipantAdd() {
        if (participants.includes(participantName)) {
            return Alert.alert('Participante já existe',
                'Ja existe um participante com esse nome na lista!')
        }

        setParticipants(preveState => [...preveState, participantName])
        setParticipantName('')
    }

    function handleParticipantRemove(name: string) {
        Alert.alert('Remover',
            `Remover o participante ${name}?`, [
            {
                text: 'Sim', onPress: () => setParticipants(prevState =>
                    prevState.filter(
                        participant => participant !== name))
            },

            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do evento
            </Text>

            <Text style={styles.eventDate}>
                terça, 18 de Outubro de 2022.
            </Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Nome do participante'
                    placeholderTextColor='#6B6B6B'
                    onChangeText={setParticipantName}
                    value={participantName}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        key={item}
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Lista vazia, adicione participantes ao evento.
                    </Text>
                )}
            />
        </View>
    )
}