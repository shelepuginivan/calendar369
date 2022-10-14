import {
    ALL_EVENTS_ROUTE,
    INDEX_ROUTE,
    LOGIN_ROUTE,
    MY_EVENTS_ROUTE, PROFILE_EDIT_ROUTE, PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    USER_REGISTERED_EVENTS_ROUTE
} from "./utils/consts";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Profile from "./components/Profile";
import IndexPage from "./components/IndexPage";
import ProfileEditor from "./components/ProfileEditor";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    }
];

export const studentRoutes = [
    {
        path: INDEX_ROUTE,
        Component: IndexPage
    },
    {
        path: ALL_EVENTS_ROUTE,
        Component: null
    },
    {
        path: USER_REGISTERED_EVENTS_ROUTE,
        Component: null
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: PROFILE_EDIT_ROUTE,
        Component: ProfileEditor
    }
];

export const teacherRoutes = [
    {
        path: INDEX_ROUTE,
        Component: IndexPage
    },
    {
        path: ALL_EVENTS_ROUTE,
        Component: null
    },
    {
        path: MY_EVENTS_ROUTE,
        Component: null
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: PROFILE_EDIT_ROUTE,
        Component: ProfileEditor
    }
]