import {TouchableOpacity, View} from 'react-native';

import Header from '../../../components/Header';
import Icon from '../../../components/Icon';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';
import {useFirebase} from '../../../contexts/AuthContext';

export function Top() {
  const {user} = useFirebase();
  return (
    <View style={{marginBottom: 10, padding: 15}}>
      <Header title={'Perfil'} color="#fff" />
      <ViewCenteredInTheMiddle>
        <EditableImageProfile />
        <TextContent fontSize={20} fontWeight="bold" color="#fff">
          {user.email}
        </TextContent>
        <TextContent fontSize={15} color="#fff">
          {user.email}
        </TextContent>
      </ViewCenteredInTheMiddle>
      <BottomStatus />
    </View>
  );
}

const ViewCenteredInTheMiddle = ({children}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 7,
        marginTop: 20,
      }}>
      {children}
    </View>
  );
};

const EditableImageProfile = () => {
  return (
    <TouchableOpacity>
      <ProfileImage size={70} />
      <Pencil />
    </TouchableOpacity>
  );
};

const Pencil = () => {
  return (
    <View
      style={{
        backgroundColor: '#2A0C4E',
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
      }}>
      <Icon name="edit" size={20} />
    </View>
  );
};

const BottomStatus = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: '#0B032D',
        borderRadius: 20,
        marginTop: 20,
      }}>
      <BottomItem
        icon={require('../../../assets/images/crown_status.png')}
        title={'Status'}
        description={'Conta gratuita'}
      />
      <BottomItem
        icon={require('../../../assets/images/calendar.png')}
        title={'Conta ativa desde'}
        description={'08/2020'}
      />
    </View>
  );
};

const BottomItem = ({icon, title, description}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 5,
      }}>
      <ProfileImage profilePhoto={icon} size={20} />
      <View style={{}}>
        <TextContent textAlign="left" fontSize={12} color="#fff">
          {title}
        </TextContent>
        <TextContent textAlign="left" fontSize={14} color="#fff">
          {description}
        </TextContent>
      </View>
    </View>
  );
};