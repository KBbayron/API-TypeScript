import { DataSource } from "typeorm";
import config from "../config/config";

import Person from "../model/Persons";
import ProductCategorie from "../model/ProductCategories";
import Corporation from "../model/Corporations";
import ContactInformation from "../model/ContactInformations";
import JobTitle from "../model/JobTitles";
import Size from "../model/Sizes";
import Permission from "../model/Permissions";
import HiringType from "../model/HiringTypes";
import OrderStatue from "../model/OrderStatues";
import ProductSize from "../model/OrderStatues";
import PaidType from "../model/PaidTypes";
import PersonalContact from "../model/PersonalContacts";
import Client from "../model/Clients";
import Employee from "../model/Employees";
import Hiring from "../model/Hirings";
import Campus from "../model/Campus";
import CampusContact from "../model/CampusContacts";
import InstitutionType from "../model/InstitutionTypes";
import Institution from "../model/Institutions";
import Order from "../model/Orders";
import OrderPaid from "../model/OrderPaids";
import Commission from "../model/Commissions";
import InstitutionsContact from "../model/InstitutionsContacts";
import JobTitlesPermission from "../model/JobTitlesPermissions";
import Product from "../model/Products";
import OrderDetail from "../model/OrderDetails";


const dbConector = new DataSource({
    type: 'mysql',
    url: config.DATABASE_URI,
    synchronize: true,
    dropSchema: true,
    entities: [
        Person,
        ProductCategorie,
        Corporation,
        ContactInformation,
        JobTitle,
        Size,
        Permission,
        HiringType,
        OrderStatue,
        ProductSize,
        PaidType,
        PersonalContact,
        Client,
        Employee,
        Hiring,
        Campus,
        CampusContact,
        InstitutionType,
        Institution,
        Order,
        OrderPaid,
        Commission,
        InstitutionsContact,
        JobTitlesPermission,
        Product,
        OrderDetail
    ]
});
export default dbConector;
