`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 09/16/2024 09:52:30 PM
// Design Name: 
// Module Name: divClock
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


module divClock(
    output reg baud,
    input clk
    );
    
    reg [9:0] baud_counter; // Needs 10 bits to hold values up to 868
    wire baud_tick = (baud_counter == 867); // Generate tick when counter reaches 868
    
    always @(posedge clk) begin
        if (baud_tick) begin
            baud_counter <= 0;
            baud = ~baud;
        end else begin
            baud_counter <= baud_counter + 1;
        end
    end
    
endmodule
