//import firestore from '@react-native-firebase/firestore';

import {ChartView} from '../screens/TypeOfBalanceSelected/widgets/ChartView';
import React from 'react';
import {Spacer} from './Spacer';
import {TextContent} from './TextContent';
import {Utils} from '../utils/Utils';
import {View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';

export const Top = ({tag, amount, title}) => {
  const [isPremium, setPremium] = React.useState(false);
  const {user} = useUserContext();

  // React.useEffect(() => {
  //   firestore()
  //     .collection('users')
  //     .doc(user?.uid)
  //     .get()
  //     .then(u => {
  //       setPremium(u.data().isPremium);
  //     });
  // }, []);
  return (
    <View style={{alignItems: 'center', marginBottom: 20}}>
      {isPremium && <ChartView tag={tag} />}

      <Spacer />
      <TextContent fontSize={19} color="#fff">
        {title}
      </TextContent>
      <TextContent fontSize={25} color="#fff" fontWeight="bold">
        {Utils.getBrazilianCurrency(amount)}
      </TextContent>
    </View>
  );
};
