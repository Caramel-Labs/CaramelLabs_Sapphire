// tests/visaService.test.js
const VisaService = require("../../src/services/visaService");
const Visa = require("../../src/models/visaModel");

jest.mock("../../src/models/visaModel");

describe("VisaService", () => {
  describe("createVisa", () => {
    it("should create and save a new visa", async () => {
      const visaData = { fullname: "John Doe" };
      const savedVisa = { ...visaData, _id: "someId" };

      Visa.prototype.save = jest.fn().mockResolvedValue(savedVisa);

      const result = await VisaService.createVisa(visaData);

      expect(result).toEqual(savedVisa);
      expect(Visa.prototype.save).toHaveBeenCalled();
    });

    it("should throw an error if saving fails", async () => {
      Visa.prototype.save = jest
        .fn()
        .mockRejectedValue(new Error("Saving failed"));

      await expect(
        VisaService.createVisa({ fullname: "John Doe" })
      ).rejects.toThrow("Saving failed");
    });
  });

  describe("updateVisa", () => {
    it("should update a visa by userId", async () => {
      const userId = "someUserId";
      const updateData = { fullname: "Jane Doe" };
      const updatedVisa = { ...updateData, _id: "someId" };

      Visa.findOneAndUpdate = jest.fn().mockResolvedValue(updatedVisa);

      const result = await VisaService.updateVisa(userId, updateData);

      expect(result).toEqual(updatedVisa);
      expect(Visa.findOneAndUpdate).toHaveBeenCalledWith(
        { user: userId },
        updateData,
        { new: true }
      );
    });

    it("should throw an error if update fails", async () => {
      Visa.findOneAndUpdate = jest
        .fn()
        .mockRejectedValue(new Error("Update failed"));

      await expect(
        VisaService.updateVisa("someUserId", { fullname: "Jane Doe" })
      ).rejects.toThrow("Update failed");
    });
  });

  describe("getVisaByUserId", () => {
    it("should find a visa by userId", async () => {
      const userId = "someUserId";
      const visa = { fullname: "John Doe", user: userId };

      Visa.findOne = jest.fn().mockResolvedValue(visa);

      const result = await VisaService.getVisaByUserId(userId);

      expect(result).toEqual(visa);
      expect(Visa.findOne).toHaveBeenCalledWith({ user: userId });
    });

    it("should throw an error if find fails", async () => {
      Visa.findOne = jest.fn().mockRejectedValue(new Error("Find failed"));

      await expect(VisaService.getVisaByUserId("someUserId")).rejects.toThrow(
        "Find failed"
      );
    });
  });

  describe("getFilteredVisas", () => {
    it("should return visas based on query parameters", async () => {
      const query = { visaStatus: "valid", nationality: "American" };
      const visas = [
        { fullname: "John Doe", visaStatus: "valid", nationality: "American" },
      ];

      Visa.find = jest.fn().mockResolvedValue(visas);

      const result = await VisaService.getFilteredVisas(query);

      expect(result).toEqual(visas);
      expect(Visa.find).toHaveBeenCalledWith(query);
    });

    it("should throw an error if find fails", async () => {
      Visa.find = jest.fn().mockRejectedValue(new Error("Find failed"));

      await expect(
        VisaService.getFilteredVisas({ visaStatus: "valid" })
      ).rejects.toThrow("Find failed");
    });
  });

  describe("getAllVisas", () => {
    it("should paginate and return visas", async () => {
      const visas = [{ fullname: "John Doe" }];
      const paginatedVisas = {
        docs: visas,
        totalDocs: 1,
        limit: 10,
        page: 1,
        totalPages: 1,
      };

      Visa.paginate = jest.fn().mockResolvedValue(paginatedVisas);

      const result = await VisaService.getAllVisas(1, 10);

      expect(result).toEqual(paginatedVisas);
      expect(Visa.paginate).toHaveBeenCalledWith(
        {},
        { page: 1, limit: 10, sort: { createdAt: -1 } }
      );
    });

    it("should throw an error if pagination fails", async () => {
      Visa.paginate = jest
        .fn()
        .mockRejectedValue(new Error("Pagination failed"));

      await expect(VisaService.getAllVisas(1, 10)).rejects.toThrow(
        "Pagination failed"
      );
    });
  });
});
