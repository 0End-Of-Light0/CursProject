var DataTypes = require("sequelize").DataTypes;
var _Authentication = require("./Authentication");
var _BankingCredentials = require("./BankingCredentials");
var _Client = require("./Client");
var _Dilivery = require("./Dilivery");
var _DiliveryType = require("./DiliveryType");
var _Distributor = require("./Distributor");
var _Order = require("./Order");
var _OrderedProducts = require("./OrderedProducts");
var _Position = require("./Position");
var _Product = require("./Product");
var _Size = require("./Size");
var _Specification = require("./Specification");
var _Type = require("./Type");
var _User = require("./User");
var _UserHistory = require("./UserHistory");
var _UserInfo = require("./UserInfo");
var _Warehouse = require("./Warehouse");

function initModels(sequelize) {
  var Authentication = _Authentication(sequelize, DataTypes);
  var BankingCredentials = _BankingCredentials(sequelize, DataTypes);
  var Client = _Client(sequelize, DataTypes);
  var Dilivery = _Dilivery(sequelize, DataTypes);
  var DiliveryType = _DiliveryType(sequelize, DataTypes);
  var Distributor = _Distributor(sequelize, DataTypes);
  var Order = _Order(sequelize, DataTypes);
  var OrderedProducts = _OrderedProducts(sequelize, DataTypes);
  var Position = _Position(sequelize, DataTypes);
  var Product = _Product(sequelize, DataTypes);
  var Size = _Size(sequelize, DataTypes);
  var Specification = _Specification(sequelize, DataTypes);
  var Type = _Type(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var UserHistory = _UserHistory(sequelize, DataTypes);
  var UserInfo = _UserInfo(sequelize, DataTypes);
  var Warehouse = _Warehouse(sequelize, DataTypes);

  User.belongsTo(Authentication, { as: "authentication", foreignKey: "authenticationid"});
  Authentication.hasMany(User, { as: "Users", foreignKey: "authenticationid"});
  Client.belongsTo(BankingCredentials, { as: "bankingcredential", foreignKey: "bankingcredentialsid"});
  BankingCredentials.hasMany(Client, { as: "Clients", foreignKey: "bankingcredentialsid"});
  Distributor.belongsTo(BankingCredentials, { as: "bankingcredential", foreignKey: "bankingcredentialsid"});
  BankingCredentials.hasMany(Distributor, { as: "Distributors", foreignKey: "bankingcredentialsid"});
  Order.belongsTo(Client, { as: "client", foreignKey: "clientid"});
  Client.hasMany(Order, { as: "Orders", foreignKey: "clientid"});
  Order.belongsTo(Dilivery, { as: "dilivery", foreignKey: "diliveryid"});
  Dilivery.hasMany(Order, { as: "Orders", foreignKey: "diliveryid"});
  Dilivery.belongsTo(DiliveryType, { as: "diliverytype", foreignKey: "diliverytypeid"});
  DiliveryType.hasMany(Dilivery, { as: "Diliveries", foreignKey: "diliverytypeid"});
  Product.belongsTo(Distributor, { as: "distributor", foreignKey: "distributorid"});
  Distributor.hasMany(Product, { as: "Products", foreignKey: "distributorid"});
  OrderedProducts.belongsTo(Order, { as: "order", foreignKey: "orderid"});
  Order.hasMany(OrderedProducts, { as: "OrderedProducts", foreignKey: "orderid"});
  User.belongsTo(Position, { as: "position", foreignKey: "positionid"});
  Position.hasMany(User, { as: "Users", foreignKey: "positionid"});
  OrderedProducts.belongsTo(Product, { as: "product", foreignKey: "productid"});
  Product.hasMany(OrderedProducts, { as: "OrderedProducts", foreignKey: "productid"});
  Specification.belongsTo(Size, { as: "size", foreignKey: "sizeid"});
  Size.hasMany(Specification, { as: "Specifications", foreignKey: "sizeid"});
  Product.belongsTo(Specification, { as: "specification", foreignKey: "specificationid"});
  Specification.hasMany(Product, { as: "Products", foreignKey: "specificationid"});
  Product.belongsTo(Type, { as: "type", foreignKey: "typeid"});
  Type.hasMany(Product, { as: "Products", foreignKey: "typeid"});
  UserHistory.belongsTo(User, { as: "user", foreignKey: "userid"});
  User.hasMany(UserHistory, { as: "UserHistories", foreignKey: "userid"});
  User.belongsTo(UserInfo, { as: "userinfo", foreignKey: "userinfoid"});
  UserInfo.hasMany(User, { as: "Users", foreignKey: "userinfoid"});
  Product.belongsTo(Warehouse, { as: "warehouse", foreignKey: "warehouseid"});
  Warehouse.hasMany(Product, { as: "Products", foreignKey: "warehouseid"});
  UserHistory.belongsTo(Warehouse, { as: "previousadress", foreignKey: "previousadressid"});
  Warehouse.hasMany(UserHistory, { as: "UserHistories", foreignKey: "previousadressid"});
  UserHistory.belongsTo(Warehouse, { as: "newadress", foreignKey: "newadressid"});
  Warehouse.hasMany(UserHistory, { as: "newadress_UserHistories", foreignKey: "newadressid"});

  return {
    Authentication,
    BankingCredentials,
    Client,
    Dilivery,
    DiliveryType,
    Distributor,
    Order,
    OrderedProducts,
    Position,
    Product,
    Size,
    Specification,
    Type,
    User,
    UserHistory,
    UserInfo,
    Warehouse,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
