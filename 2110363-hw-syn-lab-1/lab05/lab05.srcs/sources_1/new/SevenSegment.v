`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 09/30/2023 09:51:11 PM
// Design Name: 
// Module Name: SevenSegment
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


module SevenSegment
#(
    parameter N = 20
)
(
    input wire [3:0] A,B,C,D,
    input wire clock,
    output wire [6:0] Ca,
    output reg [3:0] An
    );
    initial begin
        An = 15;
    end
    reg [3:0] Now;
    reg [N-1:0] Count;
    Encoder u0(Now,Ca);
    always @(posedge clock) begin
        Count <= Count+1;
        case (Count[N-1:N-2])
            2'b00 : begin An <= 4'b1110; Now <= A; end
            2'b01 : begin An <= 4'b1101; Now <= B; end
            2'b10 : begin An <= 4'b1011; Now <= C; end
            2'b11 : begin An <= 4'b0111; Now <= D; end
        endcase
    end
endmodule