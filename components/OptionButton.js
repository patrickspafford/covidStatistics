import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    optionIconContainer: {
      marginRight: 12,
    },
    option: {
      backgroundColor: '#ffffff',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: 0,
      borderColor: '#0C2340',
      flexDirection: 'row'
    },
    optionText: {
      fontSize: 15,
      alignSelf: 'flex-start',
      marginTop: 1,
    },
  });


export default function OptionButton({ icon, label }) {
    return (
        <View style={styles.option}>
          <View style={styles.optionIconContainer}>
            <Ionicons name={icon} size={22} color="rgba(0,0,0, 1)" />
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>{label}</Text>
          </View>
        </View>
    );
  }