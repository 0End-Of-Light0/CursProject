var DataTypes = require("sequelize").DataTypes;
var _authentication = require("./authentication");
var _bankingcredentials = require("./bankingcredentials");
var _client = require("./client");
var _dilivery = require("./dilivery");
var _diliverytype = require("./diliverytype");
var _distributor = require("./distributor");
var _order = require("./order");
var _orderedproducts = require("./orderedproducts");
var _position = require("./position");
var _product = require("./product");
var _producthistory = require("./producthistory");
var _size = require("./size");
var _specification = require("./specification");
var _type = require("./type");
var _user = require("./user");
var _userinfo = require("./userinfo");
var _warehouse = require("./warehouse");

function initModels(sequelize) {
  var authentication = _authentication(sequelize, DataTypes);
  var bankingcredentials = _bankingcredentials(sequelize, DataTypes);
  var client = _client(sequelize, DataTypes);
  var dilivery = _dilivery(sequelize, DataTypes);
  var diliverytype = _diliverytype(sequelize, DataTypes);
  var distributor = _distributor(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var orderedproducts = _orderedproducts(sequelize, DataTypes);
  var position = _position(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var producthistory = _producthistory(sequelize, DataTypes);
  var size = _size(sequelize, DataTypes);
  var specification = _specification(sequelize, DataTypes);
  var type = _type(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var userinfo = _userinfo(sequelize, DataTypes);
  var warehouse = _warehouse(sequelize, DataTypes);

  user.belongsTo(authentication, { as: "authentication", foreignKey: "authentication_id"});
  authentication.hasMany(user, { as: "users", foreignKey: "authentication_id"});
  client.belongsTo(bankingcredentials, { as: "banking_credential", foreignKey: "banking_credentials_id"});
  bankingcredentials.hasMany(client, { as: "clients", foreignKey: "banking_credentials_id"});
  distributor.belongsTo(bankingcredentials, { as: "banking_credential", foreignKey: "banking_credentials_id"});
  bankingcredentials.hasMany(distributor, { as: "distributors", foreignKey: "banking_credentials_id"});
  order.belongsTo(client, { as: "client", foreignKey: "client_id"});
  client.hasMany(order, { as: "orders", foreignKey: "client_id"});
  order.belongsTo(dilivery, { as: "dilivery", foreignKey: "dilivery_id"});
  dilivery.hasMany(order, { as: "orders", foreignKey: "dilivery_id"});
  dilivery.belongsTo(diliverytype, { as: "dilivery_type", foreignKey: "dilivery_type_id"});
  diliverytype.hasMany(dilivery, { as: "diliveries", foreignKey: "dilivery_type_id"});
  product.belongsTo(distributor, { as: "distributor", foreignKey: "distributor_id"});
  distributor.hasMany(product, { as: "products", foreignKey: "distributor_id"});
  orderedproducts.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(orderedproducts, { as: "orderedproducts", foreignKey: "order_id"});
  user.belongsTo(position, { as: "position", foreignKey: "position_id"});
  position.hasMany(user, { as: "users", foreignKey: "position_id"});
  orderedproducts.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(orderedproducts, { as: "orderedproducts", foreignKey: "product_id"});
  specification.belongsTo(size, { as: "size", foreignKey: "size_id"});
  size.hasMany(specification, { as: "specifications", foreignKey: "size_id"});
  product.belongsTo(specification, { as: "specification", foreignKey: "specification_id"});
  specification.hasMany(product, { as: "products", foreignKey: "specification_id"});
  product.belongsTo(type, { as: "type", foreignKey: "type_id"});
  type.hasMany(product, { as: "products", foreignKey: "type_id"});
  order.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(order, { as: "orders", foreignKey: "user_id"});
  producthistory.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(producthistory, { as: "producthistories", foreignKey: "user_id"});
  user.belongsTo(userinfo, { as: "user_info", foreignKey: "user_info_id"});
  userinfo.hasMany(user, { as: "users", foreignKey: "user_info_id"});
  product.belongsTo(warehouse, { as: "warehouse", foreignKey: "warehouse_id"});
  warehouse.hasMany(product, { as: "products", foreignKey: "warehouse_id"});
  producthistory.belongsTo(warehouse, { as: "previous_adress", foreignKey: "previous_adress_id"});
  warehouse.hasMany(producthistory, { as: "producthistories", foreignKey: "previous_adress_id"});
  producthistory.belongsTo(warehouse, { as: "new_adress", foreignKey: "new_adress_id"});
  warehouse.hasMany(producthistory, { as: "new_adress_producthistories", foreignKey: "new_adress_id"});

  return {
    authentication,
    bankingcredentials,
    client,
    dilivery,
    diliverytype,
    distributor,
    order,
    orderedproducts,
    position,
    product,
    producthistory,
    size,
    specification,
    type,
    user,
    userinfo,
    warehouse,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
