import { DataTypes, Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  console.log('Running migration up for transactions')
  await sequelize.getQueryInterface().createTable('transactions', {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false
    },
    order_id: {  // Uso de snake_case como no modelo para consistência
      type: DataTypes.STRING(255),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),  // Adequado para valores monetários
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {  // Mapeia para o campo 'created_at' no banco de dados
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {  // Mapeia para o campo 'updated_at' no banco de dados
      type: DataTypes.DATE,
      allowNull: false
    }
  });
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  console.log('Reverting migration for transactions')
  await sequelize.getQueryInterface().dropTable('transactions');
};
