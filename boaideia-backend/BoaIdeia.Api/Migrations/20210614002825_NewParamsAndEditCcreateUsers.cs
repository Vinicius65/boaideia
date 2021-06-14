using Microsoft.EntityFrameworkCore.Migrations;

namespace BoaIdeia.Api.Migrations
{
    public partial class NewParamsAndEditCcreateUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "github",
                table: "user");

            migrationBuilder.DropColumn(
                name: "github_id",
                table: "user");

            migrationBuilder.DropColumn(
                name: "name",
                table: "user");

            migrationBuilder.DropColumn(
                name: "stackoverflow",
                table: "user");

            migrationBuilder.DropColumn(
                name: "stackoverflow_id",
                table: "user");

            migrationBuilder.AddColumn<string>(
                name: "firstname",
                table: "user",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "lastname",
                table: "user",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "username",
                table: "user",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "firstname",
                table: "user");

            migrationBuilder.DropColumn(
                name: "lastname",
                table: "user");

            migrationBuilder.DropColumn(
                name: "username",
                table: "user");

            migrationBuilder.AddColumn<string>(
                name: "github",
                table: "user",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "github_id",
                table: "user",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "user",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "stackoverflow",
                table: "user",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "stackoverflow_id",
                table: "user",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);
        }
    }
}
