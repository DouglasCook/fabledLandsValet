import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';
import { connect } from 'react-redux';

import AddItemModal from './addItemModal';
import RemovableRow from '../shared/removableRow';
import styles from '../shared/styles';
import {
  addItem,
  removeItem,
} from '../actions';


class Inventory extends Component {
  constructor() {
    super();
    this.state = { modalVisible: false };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  addItemToStore(item) {
    this.props.addItem(item);
    this.setModalVisible(false);
  }

  removeItem(key) {
    this.props.removeItem(key);
  }

  generateInventory() {
    return this.props.inventory.map((item, i) => (
      <RemovableRow
        name={item.name}
        value={formatEffects(item.effects)}
        onRemove={() => this.props.removeItem(i)}
        key={i}
      />
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}> Inventory </Text>
        {this.generateInventory()}
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            onPress={() => this.setModalVisible(true)}
            title="Add item"
          />
        </View>
        <AddItemModal
          visible={this.state.modalVisible}
          closeModal={() => this.setModalVisible(false)}
          addToInventory={state => this.addItemToStore(state)}
        />
      </View>
    );
  }
}

export function formatEffects(effects) {
  if (effects && effects.length > 0) {
    return (
      effects.map(e => `${e.skill} ${e.value}`).join(', ')
    );
  }
  return ' ';
}

const mapStateToProps = state => ({
  inventory: state.inventory,
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  removeItem: key => dispatch(removeItem(key)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inventory);