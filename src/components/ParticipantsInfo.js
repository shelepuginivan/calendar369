import React from 'react';

const ParticipantsInfo = ({participantInfo}) => {
    return (
        <p className="participant-info"><span>{participantInfo.username}</span>, <a href={'mailto:' + participantInfo.email}>{participantInfo.email}</a></p>
    );
};

export default ParticipantsInfo;