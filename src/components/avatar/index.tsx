import * as React from 'react';
import PropTypes, {InferProps} from 'prop-types';
import Avatar from '@mui/material/Avatar';

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function getInitials(name: string) {
    const initials = name.split(' ').map(part => part[0])
    if (initials.length > 2) return initials[0] + initials[initials.length - 1];
    return initials.join('').toLocaleUpperCase();
}

function stringAvatar(name: string) {
    return {
        sx: {
            fontSize: '0.9em',
            bgcolor: stringToColor(name),
        },
        children: getInitials(name),
    };
}

export default function NameAvatar({name}: InferProps<typeof NameAvatar.propTypes>) {
    return (
        <Avatar
            {...stringAvatar(name)}
        />
    )
}

NameAvatar.propTypes = {
    name: PropTypes.string.isRequired
}

