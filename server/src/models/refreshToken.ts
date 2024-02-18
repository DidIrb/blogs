import { DataTypes, Model } from 'sequelize';
import { db , models} from './index.js';
const User = models.user;
const sequelize = db.conn;

class RefreshToken extends Model {}

RefreshToken.init({
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize, // The connection instance
  modelName: 'RefreshToken' // The name of the model
});

export default RefreshToken;
