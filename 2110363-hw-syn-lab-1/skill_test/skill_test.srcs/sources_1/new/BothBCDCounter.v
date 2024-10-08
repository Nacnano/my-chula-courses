`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 10/08/2024 12:08:50 PM
// Design Name: 
// Module Name: BothBCDCounter
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


module BothBCDCounter(
    output reg [3:0] q,
    output cout,    // carryout
    output bout,    // borrowout
    input inc,      // increment input
    input dec,      // decrement input
    input clk,
    input [3:0] init_val // initial value for the counter
    );
    
    // Initialize the counter with a specific value
    initial begin
        q = init_val;
    end

    // Combinational logic for carryout and borrowout
    assign cout = (inc && (q == 9));  // carryout when incrementing from 9
    assign bout = (dec && (q == 0));  // borrowout when decrementing from 0

    always @(posedge clk) begin
        if (inc) begin
            if (q == 9) begin
                q <= 0;
            end
            else begin
                q <= q + 1;
            end
        end
        else if (dec) begin
            if (q == 0) begin
                q <= 9;
            end
            else begin
                q <= q - 1;
            end
        end
    end
endmodule
