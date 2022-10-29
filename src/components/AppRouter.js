import {Navigate, Routes, Route} from "react-router-dom";
import React from 'react';
import {publicRoutes, studentRoutes, teacherRoutes} from "../routes";
import {INDEX_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import EventPage from "./EventPage";
import EventEditor from "./EventEditor";
import EventParticipants from "./EventParticipants";

const AppRouter = () => {
    const user = localStorage.getItem('user');
    const status = localStorage.getItem('status')
    return user ?
        (
            status === 'student' ?
                (
                    <Routes>
                        {studentRoutes.map(({path, Component}) =>
                            <Route key={path} path={path} element={<Component/>} exact={true} />
                        )}
                        <Route path="event/:id" element={<EventPage/>} />
                        <Route path="*" element={<Navigate to={INDEX_ROUTE} replace />} />
                    </Routes>
                )
                :
                (
                    <Routes>
                        {teacherRoutes.map(({path, Component}) =>
                            <Route key={path} path={path} element={<Component/>} exact={true} />
                        )}
                        <Route path="event/:id" element={<EventPage/>} />
                        <Route path="event/:id/edit" element={<EventEditor />} />
                        <Route path="event/:id/participants" element={<EventParticipants />}/>
                        <Route path="*" element={<Navigate to={INDEX_ROUTE} replace />} />
                    </Routes>
                )
        )
        :
        (
            <Routes>
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact={true} />
                )}
                <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
            </Routes>
        )
};

export default AppRouter;