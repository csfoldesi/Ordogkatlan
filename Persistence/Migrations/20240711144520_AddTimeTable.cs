using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddTimeTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Programs_Stages_StageId",
                table: "Programs");

            migrationBuilder.DropIndex(
                name: "IX_Programs_StageId",
                table: "Programs");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Programs");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "Programs");

            migrationBuilder.DropColumn(
                name: "StageId",
                table: "Programs");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Programs");

            migrationBuilder.CreateTable(
                name: "TimeTables",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ProgramId = table.Column<string>(type: "TEXT", nullable: false),
                    StartTime = table.Column<DateTime>(type: "TEXT", nullable: true),
                    EndTime = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Duration = table.Column<int>(type: "INTEGER", nullable: true),
                    StageId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeTables", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeTables_Programs_ProgramId",
                        column: x => x.ProgramId,
                        principalTable: "Programs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TimeTables_Stages_StageId",
                        column: x => x.StageId,
                        principalTable: "Stages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TimeTables_ProgramId",
                table: "TimeTables",
                column: "ProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeTables_StageId",
                table: "TimeTables",
                column: "StageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimeTables");

            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "Programs",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTime",
                table: "Programs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StageId",
                table: "Programs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "Programs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Programs_StageId",
                table: "Programs",
                column: "StageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Programs_Stages_StageId",
                table: "Programs",
                column: "StageId",
                principalTable: "Stages",
                principalColumn: "Id");
        }
    }
}
