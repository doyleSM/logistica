/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1736736391989 implements MigrationInterface {
    name = 'CreateDatabase1736736391989';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" integer NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_CUSTOMER_NAME" ON "customer" ("name") `);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "order_id" integer NOT NULL, "product_id" integer NOT NULL, "value" numeric(12,2) NOT NULL, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ORDER_ITEM_PRODUCT_ID" ON "order_item" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ORDER_ITEM_ORDER_ID" ON "order_item" ("order_id") `);
        await queryRunner.query(`CREATE TABLE "order" ("id" integer NOT NULL, "date" date NOT NULL, "client_id" integer NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ORDER_DATE" ON "order" ("date") `);
        await queryRunner.query(`CREATE INDEX "IDX_ORDER_CLIENT" ON "order" ("client_id") `);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_e9674a6053adbaa1057848cddfa" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_a0d9cbb7f4a017bac3198dd8ca0" FOREIGN KEY ("client_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE VIEW customer_order_view AS
            SELECT
                c.id AS user_id,
                c.name AS name,
                COALESCE(
                    jsonb_agg(  -- Alterado para jsonb_agg
                    jsonb_build_object(  -- Alterado para jsonb_build_object
                        'order_id', o.id,
                        'date', o.date,
                        'total', o.total::text,
                        'products', o.products
                    )
                    ) FILTER (WHERE o.id IS NOT NULL),
                    '[]'::jsonb  -- Garantindo que o valor padrão seja jsonb
                ) AS orders
            FROM customer c
            LEFT JOIN (
                SELECT
                    o.id,
                    o.client_id,
                    o.date,
                    SUM(oi.value) AS total,
                    (
                        SELECT jsonb_agg(jsonb_build_object('product_id', oi2.product_id, 'value', oi2.value::text))  -- Alterado para jsonb_agg
                        FROM order_item oi2
                        WHERE oi2.order_id = o.id
                    ) AS products
                FROM "order" o
                JOIN order_item oi ON oi.order_id = o.id
                GROUP BY o.id, o.client_id, o.date
            ) o ON o.client_id = c.id
            GROUP BY c.id, c.name
            ORDER BY c.id;
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP VIEW "customer_order_view"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_a0d9cbb7f4a017bac3198dd8ca0"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_e9674a6053adbaa1057848cddfa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ORDER_CLIENT"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ORDER_DATE"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ORDER_ITEM_ORDER_ID"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ORDER_ITEM_PRODUCT_ID"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_CUSTOMER_NAME"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }
}
