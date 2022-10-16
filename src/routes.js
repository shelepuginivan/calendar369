import {
    ALL_EVENTS_ROUTE, EVENT_EDITOR_ROUTE,
    INDEX_ROUTE,
    LOGIN_ROUTE,
    MY_EVENTS_ROUTE, PROFILE_CREATE_ROUTE, PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    USER_REGISTERED_EVENTS_ROUTE
} from "./utils/consts";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Profile from "./components/Profile";
import IndexPage from "./components/IndexPage";
import ProfileEditor from "./components/ProfileEditor";
import EventCreationPage from "./components/EventCreationPage";
import MyEvents from "./components/MyEvents";
import AllEvents from "./components/AllEvents";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
];

export const studentRoutes = [
    {
        path: INDEX_ROUTE,
        Component: IndexPage
    },
    {
        path: ALL_EVENTS_ROUTE,
        Component: AllEvents
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
        path: PROFILE_CREATE_ROUTE,
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
        Component: AllEvents
    },
    {
        path: MY_EVENTS_ROUTE,
        Component: MyEvents
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: PROFILE_CREATE_ROUTE,
        Component: ProfileEditor
    },
    {
        path: EVENT_EDITOR_ROUTE,
        Component: EventCreationPage
    },
]