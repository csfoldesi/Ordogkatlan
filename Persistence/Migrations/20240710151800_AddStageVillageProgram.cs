using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddStageVillageProgram : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Villages",
                columns: table =>
                    new
                    {
                        Id = table.Column<string>(type: "TEXT", nullable: false),
                        Name = table.Column<string>(type: "TEXT", nullable: false)
                    },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Villages", x => x.Id);
                }
            );

            migrationBuilder.CreateTable(
                name: "Stages",
                columns: table =>
                    new
                    {
                        Id = table.Column<string>(type: "TEXT", nullable: false),
                        Name = table.Column<string>(type: "TEXT", nullable: false),
                        VillageId = table.Column<string>(type: "TEXT", nullable: true)
                    },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stages_Villages_VillageId",
                        column: x => x.VillageId,
                        principalTable: "Villages",
                        principalColumn: "Id"
                    );
                }
            );

            migrationBuilder.CreateTable(
                name: "Programs",
                columns: table =>
                    new
                    {
                        Id = table.Column<string>(type: "TEXT", nullable: false),
                        Title = table.Column<string>(type: "TEXT", nullable: false),
                        Description = table.Column<string>(type: "TEXT", nullable: true),
                        Time = table.Column<DateTime>(type: "TEXT", nullable: false),
                        Duration = table.Column<int>(type: "INTEGER", nullable: false),
                        StageId = table.Column<string>(type: "TEXT", nullable: true)
                    },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Programs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Programs_Stages_StageId",
                        column: x => x.StageId,
                        principalTable: "Stages",
                        principalColumn: "Id"
                    );
                }
            );

            migrationBuilder.CreateIndex(
                name: "IX_Programs_StageId",
                table: "Programs",
                column: "StageId"
            );

            migrationBuilder.CreateIndex(
                name: "IX_Stages_VillageId",
                table: "Stages",
                column: "VillageId"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "Programs");

            migrationBuilder.DropTable(name: "Stages");

            migrationBuilder.DropTable(name: "Villages");
        }
    }
}
