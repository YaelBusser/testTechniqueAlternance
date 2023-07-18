module.exports = (sequelize, DataTypes) => {
    const Citations = sequelize.define('Citations', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        citation: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    });
    return Citations;
};