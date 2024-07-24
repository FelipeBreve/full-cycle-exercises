import { DataTypes, Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    console.log('Creating table invoice_items');
    await sequelize.getQueryInterface().createTable('invoice_items', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        invoiceId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'invoice', // This is the name of the table, not the model
                key: 'id'
            }
        }
    });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    console.log('Dropping table invoice_items');
    await sequelize.getQueryInterface().dropTable('invoice_items');
};
