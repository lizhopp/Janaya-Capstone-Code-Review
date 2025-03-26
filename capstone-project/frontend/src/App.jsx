import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';
import ResourceList from './components/Resource/ResourceList';
import ResourceDetail from './components/Resource/ResourceDetail';
import AddResource from './components/Resource/AddResource';
import AddReview from './components/Review/AddReview';
import ReviewList from './components/Review/ReviewList';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/resources" exact component={ResourceList} />
                <Route path="/resources/:id" component={ResourceDetail} />
                <Route path="/resources/add" component={AddResource} />
                <Route path="/resources/:id/reviews" component={ReviewList} />
                <Route path="/resources/:id/reviews/add" component={AddReview} />
                <Route path="/profile" component={Profile} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;