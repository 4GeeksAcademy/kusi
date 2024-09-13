"""empty message

Revision ID: b9188103b5dd
Revises: d972ee1f4375
Create Date: 2024-09-13 11:47:00.229010

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b9188103b5dd'
down_revision = 'd972ee1f4375'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint('user_xd_key', type_='unique')
        batch_op.drop_column('xd')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('xd', sa.VARCHAR(length=120), autoincrement=False, nullable=False))
        batch_op.create_unique_constraint('user_xd_key', ['xd'])

    # ### end Alembic commands ###