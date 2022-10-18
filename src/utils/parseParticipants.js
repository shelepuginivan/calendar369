import React from "react";
import ParticipantsInfo from "../components/ParticipantsInfo";

export const parseParticipants = (participants) => participants.map(participant => (
        <ParticipantsInfo participantInfo={participant} />
    ))