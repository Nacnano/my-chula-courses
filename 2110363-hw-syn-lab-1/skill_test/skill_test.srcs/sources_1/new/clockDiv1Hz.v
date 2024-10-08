`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 10/08/2024 10:03:52 AM
// Design Name: 
// Module Name: clockDiv1Hz
// Project Name: 
// Target Devices: 
// Tool Versions: 
// Description: 
// 
// Dependencies: 
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
//////////////////////////////////////////////////////////////////////////////////


module clockDiv1Hz(
    output reg dividedClk,
    input wire clk
    );
    reg [31:0] counter = 0; // Enough to divide down to 1 Hz

    always @(posedge clk) begin
        counter <= counter + 1;
        if(counter == 50000000) begin
            dividedClk <= ~dividedClk;
            counter <= 0;
        end
    end
endmodule

