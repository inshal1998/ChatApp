import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import {Colors} from '../constants/theme';

type Props = TextInputProps & {
  showCountryCode?: boolean;
  onCountryChange?: (country: Country) => void;
};

const CustomTextInput: React.FC<Props> = ({
  showCountryCode = false,
  onCountryChange,
  style,
  ...rest
}) => {
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [country, setCountry] = useState<Country | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const onSelect = (selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
    setShowPicker(false);
    onCountryChange?.(selectedCountry);
  };

  return (
    <View style={styles.container}>
      {showCountryCode && (
        <>
          <TouchableOpacity
            style={styles.codeContainer}
            onPress={() => setShowPicker(true)}
          >
          </TouchableOpacity>
          <CountryPicker
            withFilter
            withCallingCode
            withFlag
            withEmoji
            withCallingCodeButton
            onSelect={onSelect}
            visible={showPicker}
            countryCode={countryCode}
            onClose={() => setShowPicker(false)}
          />
        </>
      )}

      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={Colors.border}
        {...rest}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: Colors.background,
    marginVertical: 10,
  },
  codeContainer: {
    marginRight: 10,
    paddingVertical: 12,
  },
  codeText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: Colors.textPrimary,
  },
});
