import React, {
  Component
} from 'react';

import PropTypes from 'prop-types';

import {
  View,
  Text,
  Picker,
  Button,
  TextInput,
  Modal,
  StyleSheet,
} from 'react-native';

import sharedStyles from '../shared/styles';

import {
  CARGO_TYPES,
} from '../data';

import {
  crewQualityItems,
} from './newShip';

const Item = Picker.Item;


export default class EditShipModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      port: props.ship.port,
    };
  }

  deleteShip() {
    this.props.closeModal();
    this.props.onDeleteShip();
  }

  render() {
    const {
      ship: {
        name,
        type,
        crew,
        cargo,
      },
      onUpdatePort,
      onUpdateCrew,
      onUpdateCargo,
    } = this.props;
    const { port } = this.state;

    return (
      <Modal {...this.props} >
        <View style={[sharedStyles.fullSizeCentred, { padding: 20 }]}>

          <Text style={sharedStyles.modalHeaderText}>
            {name}
          </Text>

          <Text style={styles.shipType}>
            {type}
          </Text>

          <View style={sharedStyles.row}>
            <Text style={[styles.attribute, sharedStyles.text]}>
              Docked
            </Text>
            <TextInput
              style={[styles.content, styles.portInput]}
              value={port}
              selectionColor="aquamarine"
              underlineColorAndroid="transparent"
              autoCapitalize="words"
              onChangeText={text => this.setState({ port: text })}
              onSubmitEditing={e => onUpdatePort(e.nativeEvent.text)}
            />
          </View>

          <View style={sharedStyles.row}>
            <Text style={[styles.attribute, sharedStyles.text]}>
              Crew
            </Text>
            <Picker
              style={styles.content}
              selectedValue={crew}
              onValueChange={value => onUpdateCrew(value)}
              itemStyle={styles.portInput}
            >
              {crewQualityItems}
            </Picker>
          </View>

          <View style={sharedStyles.row}>
            <Text style={[styles.attribute, sharedStyles.text]}>
              Cargo
            </Text>
          </View>

          <View style={sharedStyles.row}>
            {buildCargoPickers(cargo, (i, c) => onUpdateCargo(i, c))}
          </View>

          <Button
            onPress={() => this.deleteShip()}
            title="Delete"
            color="firebrick"
          />

        </View>
      </Modal>
    );
  }
}

EditShipModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  ship: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onUpdatePort: PropTypes.func.isRequired,
  onUpdateCrew: PropTypes.func.isRequired,
  onUpdateCargo: PropTypes.func.isRequired,
  onDeleteShip: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

function buildCargoPickers(cargo, onUpdateCargo) {
  return cargo.map((current, i) => (
    <Picker
      style={styles.content}
      selectedValue={current}
      onValueChange={value => onUpdateCargo(i, value)}
      key={i}
    >
      {cargoItems}
    </Picker>
  ));
}

const cargoItems = CARGO_TYPES.map(c =>
  <Item label={c} value={c} key={c} />
);

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
  },
  shipType: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 10,
  },
  attribute: {
    flex: 1,
    textAlign: 'left',
    fontWeight: 'bold',
    marginRight: 2,
  },
  content: {
    flex: 4,
    paddingLeft: 8,
  },
  portInput: {
    fontSize: 16,
  },
});
