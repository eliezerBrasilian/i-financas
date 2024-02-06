import {Image} from 'react-native';

export default function ProfileImage({
  profilePhoto = null,
  size = 30,
  hasBorderRadius = false,
  resizeMode = 'cover',
}) {
  return (
    <Image
      style={{
        height: size,
        width: size,
        borderRadius: hasBorderRadius ? size / 2 : 0,
        resizeMode: resizeMode,
      }}
      source={
        profilePhoto == null
          ? require('../assets/images/user_profile.png')
          : profilePhoto
      }
    />
  );
}
