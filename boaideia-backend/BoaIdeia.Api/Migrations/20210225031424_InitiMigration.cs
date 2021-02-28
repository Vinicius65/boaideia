using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace BoaIdeia.Api.Migrations
{
    public partial class InitiMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "project",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(maxLength: 200, nullable: false),
                    description = table.Column<string>(maxLength: 500, nullable: false),
                    start_date = table.Column<DateTime>(type: "Date", nullable: false),
                    end_date = table.Column<DateTime>(type: "Date", nullable: true),
                    expected_end_date = table.Column<DateTime>(type: "Date", nullable: false),
                    relevance_rank = table.Column<decimal>(nullable: false),
                    number_of_votation = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_project", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(maxLength: 200, nullable: false),
                    email = table.Column<string>(maxLength: 200, nullable: false),
                    password = table.Column<string>(maxLength: 100, nullable: false),
                    github = table.Column<string>(maxLength: 200, nullable: true),
                    stackoverflow = table.Column<string>(maxLength: 200, nullable: true),
                    social_rank = table.Column<decimal>(nullable: false),
                    number_of_votation = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "address",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_project = table.Column<long>(nullable: false),
                    neighborhood = table.Column<string>(maxLength: 200, nullable: true),
                    city = table.Column<string>(maxLength: 200, nullable: true),
                    state = table.Column<string>(maxLength: 100, nullable: true),
                    country = table.Column<string>(maxLength: 100, nullable: false),
                    type_reach = table.Column<string>(maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_address", x => x.id);
                    table.ForeignKey(
                        name: "FK_address_project_id_project",
                        column: x => x.id_project,
                        principalTable: "project",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "goal",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_project = table.Column<long>(nullable: false),
                    name = table.Column<string>(maxLength: 200, nullable: false),
                    description = table.Column<string>(maxLength: 500, nullable: false),
                    start_date = table.Column<DateTime>(type: "Date", nullable: false),
                    end_date = table.Column<DateTime>(type: "Date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_goal", x => x.id);
                    table.ForeignKey(
                        name: "FK_goal_project_id_project",
                        column: x => x.id_project,
                        principalTable: "project",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "project_user",
                columns: table => new
                {
                    id_project = table.Column<long>(nullable: false),
                    id_user = table.Column<long>(nullable: false),
                    type_permission = table.Column<string>(maxLength: 30, nullable: false),
                    entry_date = table.Column<DateTime>(type: "Date", nullable: false),
                    departure_date = table.Column<DateTime>(type: "Date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_project_user", x => new { x.id_project, x.id_user });
                    table.ForeignKey(
                        name: "FK_project_user_project_id_project",
                        column: x => x.id_project,
                        principalTable: "project",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_project_user_user_id_user",
                        column: x => x.id_user,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_address_id_project",
                table: "address",
                column: "id_project");

            migrationBuilder.CreateIndex(
                name: "IX_goal_id_project",
                table: "goal",
                column: "id_project");

            migrationBuilder.CreateIndex(
                name: "IX_project_user_id_user",
                table: "project_user",
                column: "id_user");

            migrationBuilder.CreateIndex(
                name: "IX_user_email",
                table: "user",
                column: "email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "address");

            migrationBuilder.DropTable(
                name: "goal");

            migrationBuilder.DropTable(
                name: "project_user");

            migrationBuilder.DropTable(
                name: "project");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
