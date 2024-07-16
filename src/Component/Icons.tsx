import React from 'react';
import { AntDesign, FontAwesome, FontAwesome5, Ionicons, Feather, MaterialCommunityIcons, Entypo, MaterialIcons, SimpleLineIcons, Octicons, Foundation, EvilIcons } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';

export const Icons = {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Feather,
    FontAwesome,
    FontAwesome5,
    AntDesign,
    Entypo,
    SimpleLineIcons,
    Octicons,
    Foundation,
    EvilIcons,
}

export interface IconProps {
    type: React.ComponentType<any>;
    name: string;
    color?: string;
    size?: number;
    style?: StyleProp<ViewStyle>;
}

const Icon = ({ type, name, color, size = 24, style }: IconProps) => {
    const Tag = type;
    return (
        <>
            {type && name && (
                <Tag name={name} size={size} color={color} style={style} />
            )}
        </>
    )
}

export default Icon;
