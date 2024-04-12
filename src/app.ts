import express from 'express';
import config from './config/config';
import "reflect-metadata";
import dbConector from './database/dbConector'

const app = express();
app.set('port', config.PORT);
const port = app.get('port');

// Routes
import campusContacts from "./routes/CampusContacts";
import campus from "./routes/Campus";
import clients from "./routes/Clients";
import commissions from './routes/Commissions';
import contactInformations from './routes/ContactInformations';
import Corporations from './routes/Corporations';
import employees from "./routes/Employees";
import hirings from "./routes/Hirings";
import hiringTypes from "./routes/HiringTypes";
import institutions from "./routes/Institutions";
import institutionsContacts from "./routes/InstitutionsContacts";
import institutionTypes from "./routes/InstitutionTypes";
import jobTitles from './routes/JobTitles';
import jobTitlesPermissions from './routes/JobTitlesPermissions';
import orderDetails from "./routes/OrderDetails";
import orderPaids from './routes/OrderPaids';
import orders from './routes/Orders';
import orderStatues from './routes/OrderStatues';
import paidTypes from './routes/PaidTypes';
import permissions from './routes/Permissions';
import personalContacts from './routes/PersonalContacts';
import persons from "./routes/persons";
import productCategories from './routes/ProductCategories';
import products from './routes/Products';
import productSizes from './routes/ProductSizes';
import sizes from './routes/Sizes';

try {
    dbConector.initialize();
    app.listen(port, () => {
        console.log('Servidor iniciado en el puerto: ', port);
    })

    app.use('/api/commissions', commissions)
    app.use('/api/contactInformations', contactInformations)
    app.use('/api/Corporations', Corporations)
    app.use('/api/clients', clients)
    app.use('/api/employees', employees)
    app.use('/api/persons', persons)
    app.use('/api/campusContacts', campusContacts)
    app.use('/api/campus', campus)
    app.use('/api/hirings', hirings)
    app.use('/api/hiringTypes', hiringTypes)
    app.use('/api/institutions', institutions)
    app.use('/api/institutionsContacts', institutionsContacts)
    app.use('/api/InstitutionTypes', institutionTypes)
    app.use('/api/JobTitles', jobTitles)
    app.use('/api/JobTitles', jobTitlesPermissions)
    app.use('/api/orderDetails', orderDetails)
    app.use('/api/orderStatues', orderStatues)
    app.use('/api/paidTypes', paidTypes)
    app.use('/api/orderPaids', orderPaids)
    app.use('/api/orders', orders)
    app.use('/api/permissions', permissions)
    app.use('/api/personalContacts', personalContacts)
    app.use('/api/productCategories', productCategories)
    app.use('/api/products', products)
    app.use('/api/sizes', sizes)
    app.use('/api/productSizes', productSizes)

} catch (error) {
    console.log('Error al levantar', error);
}