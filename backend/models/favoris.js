module.exports = (sequelize, DataTypes) => {
    const Favoris = sequelize.define('Favoris', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        personnage: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        episode: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        citation: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    });
    return Favoris;
};