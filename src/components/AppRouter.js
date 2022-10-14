import {Navigate, Routes, Route} from "react-router-dom";
import React from 'react';
import {publicRoutes, studentRoutes, teacherRoutes} from "../routes";
import {INDEX_ROUTE, LOGIN_ROUTE} from "../utils/consts";

const AppRouter = () => {
    const user = sessionStorage.getItem('user');
    const status = sessionStorage.getItem('status')
    console.log(user)
    return user ?
        (
            status === 'student' ?
                (
                    <Routes>
                        {studentRoutes.map(({path, Component}) =>
                            <Route key={path} path={path} element={<Component/>} exact={true} />
                        )}
                        <Route path="*" element={<Navigate to={INDEX_ROUTE} replace />} />
                    </Routes>
                )
                :
                (
                    <Routes>
                        {teacherRoutes.map(({path, Component}) =>
                            <Route key={path} path={path} element={<Component/>} exact={true} />
                        )}
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